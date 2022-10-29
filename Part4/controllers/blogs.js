//Create new router object
const blogsRouter = require("express").Router();
//Import Blog model from models directorys

const Blog = require("../models/blog");

//Import User mode from models direactory
const User = require("../models/user");

//All router in middleware Router ar relative to
//Controller to get all blogs
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
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
  const body = request.body;

  //get the user
  const user = await User.findById(body.userId);

  console.log(user);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
  });

  //Saved blog
  const blogSaved = await blog.save();

  //Add saved blog to blogs array in user
  user.blogs = user.blogs.concat(blogSaved._id);
  await user.save();
  return response.status(201).json(blogSaved);
});

//Controller to delete a blog
blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

//Controller to update a blog
blogsRouter.put("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body);

  const updatedBlog = await Blog.findById(request.params.id);

  response.status(200).send(updatedBlog);
});

//The module exports the router to be available for all consumers of the module.module.exports = blogsRouter;
module.exports = blogsRouter;
