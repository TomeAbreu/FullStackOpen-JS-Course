const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const config = require("../utils/config");
const helper = require("./test_helper");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  //Method to be run before each test
  beforeEach(async () => {
    //Establish database connection
    await mongoose.connect(config.MONGODB_URI);
    //Delete all users
    await User.deleteMany({});

    //Create user
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "root", passwordHash });

    //saveg user in database
    await user.save();
  }, 100000);

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails with proper statuscode and message if username is not present", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` is required");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails with proper statuscode and message if password is not present", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root1",
      name: "Superuser",
      password: "",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toEqual("Password must be at least 3 characters");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
  test("creation fails with proper statuscode and message if password has less than 3 chars", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root1",
      name: "Superuser",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Password must be at least 3 characters"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

//Close connection to database in the end of the tests
afterAll(() => {
  mongoose.connection.close();
});
