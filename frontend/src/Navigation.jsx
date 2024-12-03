import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import CreatePost from "./CreatePost";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import YourPost from "./YourPost";
import AboutUS from "./About";

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileName, setProfileName] = useState("");

  function handleLogout() {
    setIsAuthenticated(false);
    setUserId(null);
    axios
      .post("http://localhost:3000/logout", {}, { withCredentials: true })
      .then((res) => {
        alert(res.data.message);
      });
  }

  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="brand-name">
            <h1>BlogIn...</h1>
            <div className="nav-elements">
              {!isAuthenticated ? (
                <div className="nav-childelements">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/login" className="nav-btn">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="nav-btn">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link to="/about"> About Us</Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="nav-childelements">
                  <ul>
                    <li>
                      <Profile userName={profileName} />{" "}
                    </li>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/createpost"> Create Post</Link>
                    </li>
                    <li>
                      <Link to="/yourpost">Your Post</Link>
                    </li>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="nav-btn">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div></div>
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
              <Route path="/yourpost" element={<YourPost />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default Navigation;
