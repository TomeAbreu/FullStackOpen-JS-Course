const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const config = require("../utils/config");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((blog) => blog.title);
  expect(titles).toContain("Dan Flying Solo");
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Tech Blog",
    author: "Tome",
    url: "https://www.macrumors.com/",
    likes: 22,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDb();

  const titles = blogs.map((r) => r.title);

  expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain("Tech Blog");
});

test("a valid blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const blogTest = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

  expect(blogTest.body).toEqual(processedBlogToView);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map((r) => r.title);

  expect(titles).not.toContain(blogToDelete.title);
});

test("blog has a unique identifer named id ", async () => {
  const blogsAtTheStart = await helper.blogsInDb();
  blogsAtTheStart.map((blog) => expect(blog.id).toBeDefined());
});

test("likes property is missing", async () => {
  const newBlog = {
    title: "Tech Blog",
    author: "Tome",
    url: "https://www.macrumors.com/",
  };

  const blogAdded = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(blogAdded.body.likes).toEqual(0);
});

//Before each test, connect to DB clean database and add two blogs
beforeEach(async () => {
  await mongoose.connect(config.MONGODB_URI);
  await Blog.deleteMany({});
  console.log("cleared");

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);

  console.log("done");
}, 100000);

//Close connection to database in the end of the tests
afterAll(() => {
  mongoose.connection.close();
});
