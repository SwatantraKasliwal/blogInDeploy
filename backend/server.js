import express from "express";
import pg from "pg";
import cors from "cors";
import env from "dotenv";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import cookieParser from "cookie-parser";
import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = 'https://iqhkjmdkubgkftbnnajb.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)


const app = express();
const port = 3000;
const saltRounds = 10;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASS,
  port: 6543,
});
db.connect();

app.get("/", async (req, res) => {
  const query =
    "SELECT p.*, u.username FROM posts p JOIN userlogin u ON u.id = p.post_author ORDER BY p.post_id DESC";
  try {
    db.query(query, (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data.rows);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Unexpected Error" });
  }
});

app.get("/yourpost", (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id; // Authenticated user's ID from the session
    db.query(
      `SELECT p.*, u.username 
       FROM posts p 
       JOIN userlogin u ON u.id = p.post_author 
       WHERE p.post_author = $1
       ORDER BY p.post_id DESC`,
      [userId],
      (err, data) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data.rows);
      }
    );
  } else {
    res.status(401).json({ error: "Unauthorized access" });
  }
});

app.post("/createpost", async (req, res) => {
  if (req.isAuthenticated()) {
    const { title, content, authorId } = req.body;
    const postDate = new Date().toISOString().slice(0, 10);
    console.log("Received Data:", { title, content, authorId, postDate });
    if (!title || !content || !authorId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields." });
    }
    await db.query(
      `INSERT INTO posts(post_title, post_content,post_date, post_author) values($1,$2,$3,$4) RETURNING *`,
      [title, content, postDate, authorId],
      (error, results) => {
        if (error) {
          console.error("Error inserting post:", error);
          return res
            .status(500)
            .json({ success: false, message: "Database error." });
        }
        res.status(201).json({ success: true, post: results.rows[0] });
      }
    );
  } else {
    return res
      .status(500)
      .json({ error: "Error posting you blog please try again later" });
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      message: "Login successful 😊",
      userId: req.user.id,
      userName: req.user.username,
    });
  } else {
    res.json({ success: false, message: "Please retry Login 😔" });
  }
});

app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  const checkUser = await db.query("SELECT * FROM userlogin WHERE email=$1", [
    email,
  ]);
  if (checkUser.rows.length > 0) {
    res.json({
      success: false,
      message: "User already exist please try log in",
    });
  } else {
    await db.query(
      "INSERT INTO userlogin(username,email,password) VALUES ($1,$2,$3)",
      [userName, email, password]
    );
    const result = await db.query("SELECT * FROM userlogin WHERE email=$1", [
      email,
    ]);
    const user = result.rows[0];
    req.login(user, (err) => {
      res.json({
        success: true,
        message: "Login Successful 😊",
        userId: user.id,
        userName: user.username,
      });
    });
  }
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error logging out." });
    }
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error destroying session." });
      }
      res.json({ success: true, message: "Logged out successfully." });
    });
  });
});

app.post("/delete", (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const { postId } = req.body;
    console.log("this is from /delete section: ", userId, postId);
    db.query(
      "DELETE from posts WHERE post_id=$1 AND post_author=$2",
      [postId, userId],
      (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res
          .status(200)
          .json({ success: true, message: "Post deleted successfully." });
      }
    );
  }
});

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM userlogin WHERE email=$1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedPassword = user.password;
        if (password === storedPassword) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: "Incorrect password" });
        }
      } else {
        return cb(null, false, { message: "Incorrect email" });
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query("SELECT * FROM userlogin WHERE id=$1", [id]);
    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      done(new Error("User not found"));
    }
  } catch (err) {
    done(err);
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
