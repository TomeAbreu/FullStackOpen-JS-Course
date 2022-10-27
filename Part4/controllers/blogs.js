//Create new router object
const blogsRouter = require("express").Router();
//Import Blog model from models directory
const Blog = require("../models/blog");

//All router in middleware Router ar relative to
//Controller to get all blogs
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

//Controller to add new blog
blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const blogSaved = await Blog.save();
  return response.status(201).json(blogSaved);
});

//The module exports the router to be available for all consumers of the module.module.exports = blogsRouter;
module.exports = blogsRouter;
