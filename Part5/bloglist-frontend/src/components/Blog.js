import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlogLikesCallBack }) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false);

  const toggleBlogDetails = () => {
    if (!blogDetailsVisible) {
    }
    setBlogDetailsVisible(!blogDetailsVisible);
  };

  const handleIncreaseLike = async () => {
    blog.likes = blog.likes + 1;

    //Make put request to update blog
    try {
      const blogUpdated = await blogService.updateBlog(blog);
      updateBlogLikesCallBack(blog.id, blogUpdated.likes);
    } catch (error) {}
  };

  const showBlogDetails = () => (
    <div>
      <p>{blog.url}</p>
      <div>
        <span>{blog.likes}</span>
        <button onClick={handleIncreaseLike}>like</button>
      </div>

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
