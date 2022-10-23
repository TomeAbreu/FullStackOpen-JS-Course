//Create new router object
const blogsRouter = require("express").Router();
//Import Blog model from models directory
const Blog = require("../models/blog");

//All router in middleware Router ar relative to
//Controller to get all blogs
blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

//Controller to add new blog
blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

//The module exports the router to be available for all consumers of the module.module.exports = blogsRouter;
module.exports = blogsRouter;
