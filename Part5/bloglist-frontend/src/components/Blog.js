import React from "react";
import { useState } from "react";

const Blog = ({ blog }) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false);

  const toggleBlogDetails = () => {
    if (!blogDetailsVisible) {
      console.log("Show blog details");
    }
    setBlogDetailsVisible(!blogDetailsVisible);
  };

  const showBlogDetails = () => (
    <div>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
      <p>{blog.author}</p>
    </div>
  );

  return (
    <div className="blog">
      <span>{blog.title} </span>
      <button onClick={toggleBlogDetails}>
        {blogDetailsVisible ? "hide" : "view"}
      </button>
      {blogDetailsVisible === true && showBlogDetails()}
    </div>
  );
};

export default Blog;
