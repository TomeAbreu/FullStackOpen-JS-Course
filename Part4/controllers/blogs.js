//Create new router object
const blogsRouter = require('express').Router()
//Import Blog model from models directorys
const Blog = require('../models/blog')

//Import Comment model from directory
const Comment = require('../models/comment')

//Import User mode from models direactory
const User = require('../models/user')

const { info } = require('../utils/logger')

//Controller to get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('comments')
    .populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

//Controller to get blog by Id
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('comments')
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

//Controller to add new blog
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  //get the user from token in request with previous middleware extractUser and extractToken
  const user = request.user

  if (!user) {
    return response
      .status(401)
      .json({ token: 'No user info was present in request' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  //Saved blog
  const blogSaved = await blog.save()

  //Add saved blog to blogs array in user
  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()
  return response.status(201).json(blogSaved)
})

//Controller to delete a blog
blogsRouter.delete('/:id', async (request, response) => {
  //get the user from token in request with previous middleware extractUser and extractToken
  const user = request.user
  //get blog to delete
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response
      .status(400)
      .send({ error: 'Not possible to delete blog not owned by you' })
  }
})

//Controller to update a blog
blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)

  const updatedBlog = await Blog.findById(request.params.id)

  response.status(200).send(updatedBlog)
})

//Add comment to a blog
blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  //get the user from token in request with previous middleware extractUser and extractToken
  const user = request.user

  if (!user) {
    return response
      .status(401)
      .json({ token: 'No user info was present in request' })
  }

  //Comment entity
  const comment = new Comment({
    content: body.content,
  })

  //Get the blog
  const blog = await Blog.findById(request.params.id)

  //add comment to the blog
  blog.comments.push(comment)

  //Save the blog in the database
  await blog.save()

  comment.blog = request.params.id
  await comment.save()

  //Fill comments also in query with populate
  const returnedBlog = await Blog.findById(request.params.id).populate(
    'comments'
  )

  return response.status(200).json(returnedBlog)
})

//The module exports the router to be available for all consumers of the module.module.exports = blogsRouter;
module.exports = blogsRouter
