import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import CreatePost from "./CreatePost";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import YourPost from "./YourPost";
import AboutUS from "./About";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [open, setOpen] = React.useState(false);

  function handleLogout() {
    setIsAuthenticated(false);
    setUserId(null);
    axios
      .post(
        "https://bloginserver.onrender.com/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        alert(res.data.message);
        useNavigate("/");
      });
  }

  return (
    <Router>
      <div>
        <nav className="navbar">
            <div className="brand-name">
              <h1>BlogIn...</h1>
            </div>
            <div className="nav-elements">
              <button onClick={() => setOpen(true)} className="nav-btn hamburger">
                ☰
              </button>
              {!isAuthenticated ? (
                <div className="nav-childelements">
                  <Drawer
                    anchor="right"
                    open={open}
                    onClose={() => setOpen(false)}
                  >
                    <List>
                      <ListItem>
                        <Link to="/">Home</Link>
                      </ListItem>
                      <ListItem>
                        <Link to="/login" className="nav-btn">
                          Login
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="/register" className="nav-btn">
                          Register
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="/about"> About Us</Link>
                      </ListItem>
                    </List>
                  </Drawer>
                </div>
              ) : (
                <div className="nav-childelements">
                  <Drawer
                    anchor="right"
                    open={open}
                    onClose={() => setOpen(false)}
                  >
                    <List>
                      <ListItem>
                        <Profile userName={profileName} />{" "}
                      </ListItem>
                      <ListItem>
                        <Link to="/">Home</Link>
                      </ListItem>
                      <ListItem>
                        <Link to="/createpost"> Create Post</Link>
                      </ListItem>

                      <ListItem>
                        <Link to="/yourpost">Your Post</Link>
                      </ListItem>
                      <ListItem>
                        <Link to="/about">About Us</Link>
                      </ListItem>
                      <ListItem>
                        <button onClick={handleLogout} className="nav-btn">
                          Logout
                        </button>
                      </ListItem>
                    </List>
                  </Drawer>
                </div>
              )}
            </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUS />} />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUserId={setUserId}
                setProfileName={setProfileName}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                setIsAuthenticated={setIsAuthenticated}
                setUserId={setUserId}
                setProfileName={setProfileName}
              />
            }
          />
          {isAuthenticated && (
            <>
              <Route
                path="/createpost"
                element={<CreatePost authorId={userId} />}
              />
              <Route path="/yourpost" element={<YourPost userId={userId} />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default Navigation;
