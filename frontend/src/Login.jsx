import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsAuthenticated, setUserId, setProfileName }) {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "https://bloginserver.onrender.com/login",
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          console.log("Response received:", res.data);
          setIsAuthenticated(true);
          setUserId(res.data.userId);
          setProfileName(res.data.userName);
          alert(res.data.message);
          navigate("/");
        } else {
          alert(res.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        alert(
          "Error: " + err.response.data.message || "An unknown error occurred."
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} id="login-form">
        <div className="form-element">
          <div>
            <label htmlFor="email">Enter your email:</label>
          </div>
          <div>
            <input
              type="email"
              name="username"
              placeholder="Enter your email"
              value={username}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div className="form-element">
          <div>
            <label htmlFor="password">Password:</label>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <button type="submit" className="btn-element">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
