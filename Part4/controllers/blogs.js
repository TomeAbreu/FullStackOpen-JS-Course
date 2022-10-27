//Create new router object
const blogsRouter = require("express").Router();
//Import Blog model from models directorys
const Blog = require("../models/blog");

//All router in middleware Router ar relative to
//Controller to get all blogs
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

//Controller to get blog by Id
blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

//Controller to add new blog
blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const blogSaved = await blog.save();
  return response.status(201).json(blogSaved);
});

//Controller to delete a blog
blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

//The module exports the router to be available for all consumers of the module.module.exports = blogsRouter;
module.exports = blogsRouter;
