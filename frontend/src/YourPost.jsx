import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function YourPost({userId}) {
  const [yourBlogs, setYourBlogs] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("https://bloginserver.onrender.com/yourpost",{userId}, { withCredentials: true })
      .then((res) => {
        console.log(res.data.data);
        setYourBlogs(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  const toggleExpand = (index) => {
    setExpandedPosts((prevExpandedPosts) => ({
      ...prevExpandedPosts,
      [index]: !prevExpandedPosts[index],
    }));
  };

  const handleDeleteSubmit=(postId) =>(event)=>{
    event.preventDefault();
    console.log(postId);
    axios.post("https://bloginserver.onrender.com/delete", {userId, postId},{ withCredentials: true })
    .then((res)=>{
      if(res.data.success){
        console.log(res.data);
        setYourBlogs(yourBlogs.filter((blog) => blog.post_id !== postId));
        alert(res.data.message);
        navigate("/yourpost");
      }else{
        alert("Error deleting the post");
      }
    }).catch(err=>{
      console.log("This is the error in the delete section", err);
      alert("Error Deleting the post");
    })
  }

  return (
    <>
      <div className="home-container">
        {yourBlogs.map((blog, i) => (
          <div className="home-element" key={i}>
            <div key={i}>
              <div className="home-title">
                <h2>{blog.post_title}</h2>
              </div>
              <div className="home-content">
                <p>
                  <strong>By:</strong> {blog.username}
                </p>
              </div>
              <div className="home-content">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(blog.post_date).toISOString().split("T")[0]}
                </p>
              </div>
              <div className="home-content">
                <p>
                  {expandedPosts[i]
                    ? blog.post_content
                    : blog.post_content.slice(0, 100) + "..."}
                </p>
              </div>
              <button onClick={() => toggleExpand(i)} className="btn-element">
                {expandedPosts[i] ? "Read Less" : "Read More"}
              </button>
              <div>
                <form onSubmit={handleDeleteSubmit (blog.post_id)}>
                <button className="btn-element delete-btn" type="submit">Delete</button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default YourPost;
