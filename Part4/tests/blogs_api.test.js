const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const config = require("../utils/config");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { application } = require("express");

describe("When there is initially some blogs saved", () => {
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

  test("blogs have a unique identifer named id ", async () => {
    const blogsAtTheStart = await helper.blogsInDb();
    blogsAtTheStart.map((blog) => expect(blog.id).toBeDefined());
  });

  describe("Viewing a specicif blog", () => {
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

    test("fails with status 400 if title or url is missing", async () => {
      const blogWithMissingTitle = {
        title: "",
        author: "Tome",
        url: "https://www.macrumors.com/",
        likes: 13,
      };

      const blogWithMissingUrl = {
        title: "Carlos",
        author: "Tome",
        url: "",
        likes: 13,
      };

      await api
        .post("/api/blogs")
        .send(blogWithMissingTitle)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      await api
        .post("/api/blogs")
        .send(blogWithMissingUrl)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("Addition of a new blog", () => {
    test("a valid blog can be added", async () => {
      //Create a user
      const user = {
        username: "motu",
        name: "Master of the Universe",
        password: "motu",
      };

      //Create user request
      await api.post("/api/users/").send(user).expect(201);

      const userLogin = {
        username: user.username,
        password: user.password,
      };
      //Get token info with Login Request
      const userLoginData = await api
        .post("/api/login/")
        .send(userLogin)
        .expect(200);

      //Get user info with userExtractor middleware
      const decodedToken = jwt.verify(
        userLoginData.body.token,
        process.env.SECRET
      );

      //Blog to add with user Id
      const newBlog = {
        title: "Tech Blog",
        author: "Tome",
        url: "https://www.macrumors.com/",
        likes: 22,
        user: decodedToken.id,
      };

      //Send token to create blog for this user
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userLoginData.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await helper.blogsInDb();

      const titles = blogs.map((r) => r.title);

      expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
      expect(titles).toContain("Tech Blog");
    });

    test("a valid blog can't be added if token is invalid or missing", async () => {
      //Create a user
      const user = {
        username: "motu",
        name: "Master of the Universe",
        password: "motu",
      };

      //Create user request
      await api.post("/api/users/").send(user).expect(201);

      const userLogin = {
        username: user.username,
        password: user.password,
      };
      //Get token info with Login Request
      const userLoginData = await api
        .post("/api/login/")
        .send(userLogin)
        .expect(200);

      //Get user info with userExtractor middleware
      const decodedToken = jwt.verify(
        userLoginData.body.token,
        process.env.SECRET
      );

      //Blog to add with user Id
      const newBlog = {
        title: "Tech Blog",
        author: "Tome",
        url: "https://www.macrumors.com/",
        likes: 22,
        user: decodedToken.id,
      };

      //Send token to create blog for this user
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer carlos`)
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);

      const blogs = await helper.blogsInDb();

      const titles = blogs.map((r) => r.title);

      expect(blogs).toHaveLength(helper.initialBlogs.length);
    });

    test("when likes property is missing default number of likes is 0", async () => {
      //Create a user
      const user = {
        username: "motu",
        name: "Master of the Universe",
        password: "motu",
      };

      //Create user request
      await api.post("/api/users/").send(user).expect(201);

      const userLogin = {
        username: user.username,
        password: user.password,
      };
      //Get token info with Login Request
      const userLoginData = await api
        .post("/api/login/")
        .send(userLogin)
        .expect(200);

      //Get user info with userExtractor middleware
      const decodedToken = jwt.verify(
        userLoginData.body.token,
        process.env.SECRET
      );

      const newBlog = {
        title: "Tech Blog",
        author: "Tome",
        url: "https://www.macrumors.com/",
      };

      const blogAdded = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userLoginData.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(blogAdded.body.likes).toEqual(0);
    });
  });

  describe("Deletion of a blog", () => {
    test("a blog can be deleted", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      //Create new user in database
      const newUser = {
        username: "motu",
        name: "Master of the Universe",
        password: "motu",
      };
      await api.post("/api/users/").send(newUser).expect(201);
      //Login with user
      const userLogin = {
        username: "motu",
        password: "motu",
      };
      const userLoginData = await api
        .post("/api/login")
        .send(userLogin)
        .expect(200);

      //Get user info with userExtractor middleware
      const decodedToken = jwt.verify(
        userLoginData.body.token,
        process.env.SECRET
      );

      //Blog to add with user Id
      const newBlog = {
        title: "Tech Blog",
        author: "Tome",
        url: "https://www.macrumors.com/",
        likes: 22,
        user: decodedToken.id,
      };

      //Send token to create blog for this user
      const blogAdded = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userLoginData.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      await api
        .delete(`/api/blogs/${blogAdded.body.id}`)
        .set("Authorization", `Bearer ${userLoginData.body.token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

      const titles = blogsAtEnd.map((r) => r.title);

      expect(titles).not.toContain(blogAdded.title);
    });
  });

  describe("Update of a blog", () => {
    test("a blog can be updated", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdateId = blogsAtStart[0].id;

      await api
        .put(`/api/blogs/${blogToUpdateId}`)
        .send({
          title: blogsAtStart[0].title,
          author: blogsAtStart[0].author,
          likes: blogsAtStart[0].likes + 1,
        })
        .expect(200);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      expect(blogsAtEnd[0].likes).toEqual(blogsAtStart[0].likes + 1);
    });
  });
});

//Before each test, connect to DB clean database and add two blogs
beforeEach(async () => {
  await mongoose.connect(config.MONGODB_URI);
  await Blog.deleteMany({});
  await User.deleteMany({});
  console.log("cleared");

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  console.log("Done creating blogs");

  await Promise.all(promiseArray);

  console.log("All done");
}, 100000);

//Close connection to database in the end of the tests
afterAll(() => {
  mongoose.connection.close();
});
