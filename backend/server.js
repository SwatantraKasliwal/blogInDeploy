import express from "express";
import pkg from "pg";
import cors from "cors";
import env from "dotenv";
import bcrypt from "bcrypt";

env.config();
const app = express();
const port = 3000;
const { Pool } = pkg;
const saltRounds = 10;

app.use(express.json());
app.use(
  cors({
    origin: ["https://blogin-8kyz.onrender.com","http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necessary for Neon connections
  },
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to Neon database:", err.stack);
  } else {
    console.log("Connected to Neon database successfully!");
  }
});

// Routes
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
    // console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Unexpected Error" });
  }
});

app.post("/yourpost", async (req, res) => {
  const { userId } = req.body; // Extract userId from the request body
  if (!userId) {
    return res.status(400).json({ success: false, message: "Login issue, Retry Login" });
  }
  try {
    const result = await db.query(
      `SELECT p.*, u.username FROM posts p 
       JOIN userlogin u ON u.id = p.post_author 
       WHERE p.post_author = $1 
       ORDER BY p.post_id DESC`,
      [userId]
    );
    return res.json({ success: true, data: result.rows });
  } catch (error) {
    // console.error("Error fetching user posts:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});


app.post("/createpost", (req, res) => {
    const { title, content, authorId } = req.body;
    const postDate = new Date().toISOString().slice(0, 10);
    // console.log("Received Data:", { title, content, authorId, postDate });
    if (!title || !content || !authorId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields." });
    }
    db.query(
      `INSERT INTO posts(post_title, post_content, post_date, post_author) values($1, $2, $3, $4) RETURNING *`,
      [title, content, postDate, authorId],
      (error, results) => {
        if (error) {
          // console.error("Error inserting post:", error);
          return res
            .status(500)
            .json({ success: false, message: "Database error." });
        }
        res.status(201).json({ success: true, post: results.rows[0] });
      }
    );
});

app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Add debug logging
    // console.log("Original password:", password);

    // Hash the password
    const hashPass = await bcrypt.hash(password, saltRounds);
    // console.log("Hashed password:", hashPass); // Verify hash is generated

    // Insert user into the database
    const result = await db.query(
      "INSERT INTO userlogin(username, email, password) VALUES ($1, $2, $3) RETURNING password",
      [userName, email, hashPass]
    );

    // Verify stored hash
    // console.log("Stored password in DB:", result.rows[0].password);

    return res.status(201).json({
      success: true,
      message: "Registration successful 😊. Please log in.",
    });
  } catch (error) {
    // console.error("Error during registration:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user by email
    const result = await db.query("SELECT * FROM userlogin WHERE email = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "You are not registered. Please register first.",
      });
    }

    const user = result.rows[0];
    const storedPassword = user.password;

    // Add debug logging
    // console.log("Login attempt - Provided password:", password);
    // console.log("Stored hashed password:", storedPassword);

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, storedPassword);
    // console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // Successful login
    return res.json({
      success: true,
      message: "Login successful 😊",
      userId: user.id,
      userName: user.username,
    });
  } catch (error) {
    // console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

app.post("/logout", (req, res) => {
  res.json({success:true,message:"Logged out successfully"});
});

app.post("/delete",async (req, res) => {
  const {userId, postId } = req.body;
  // console.log("this is from /delete section: ", userId, postId);
    const result =db.query(
      "DELETE from posts WHERE post_id=$1 AND post_author=$2",
      [postId, userId]);
        return res
          .status(200)
          .json({ success: true, message: "Post deleted successfully." });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
