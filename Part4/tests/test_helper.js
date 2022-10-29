const Blog = require("../models/blog.js");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Dan Flying Solo",
    author: "Carlos",
    url: "https://www.danflyingsolo.com",
    likes: 15,
  },
  {
    title: "I am a food blog",
    author: "Dan",
    url: "https://iamafoodblog.com/",
    likes: 23,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
