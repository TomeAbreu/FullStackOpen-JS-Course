const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const config = require("../utils/config");

const api = supertest(app);
const Blog = require("../models/blog");
//Initial Persons to be testes
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

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((blog) => blog.title);
  expect(titles).toContain("Dan Flying Solo");
});

//Before each test, connect to DB clean database and add two blogs
beforeEach(async () => {
  await mongoose.connect(config.MONGODB_URI);
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
}, 100000);

//Close connection to database in the end of the tests
afterAll(() => {
  mongoose.connection.close();
});
