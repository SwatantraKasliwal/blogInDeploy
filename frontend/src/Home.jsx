import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleExpand = (index) => {
    setExpandedPosts((prevExpandedPosts) => ({
      ...prevExpandedPosts,
      [index]: !prevExpandedPosts[index],
    }));
  };

  return (
    <div className="home-container">
      {blogs.map((blog, i) => (
        <div className="home-element">
          <div key={i}>
            <div className="home-title">
              <h2>{blog.post_title}</h2>
            </div>
            <div className="home-content">
              <p>By: {blog.username}</p>
            </div>
            <div className="home-content">
              <p>
                Date: {new Date(blog.post_date).toISOString().split("T")[0]}
              </p>
            </div>
            <div className="home-content">
              <p>
                {expandedPosts[i]
                  ? blog.post_content
                  : blog.post_content.slice(0, 100) + "..."}
              </p>
            </div>
            <button className="btn-element" onClick={() => toggleExpand(i)}>
              {expandedPosts[i] ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
