//Import bcrypt middleware for password hash authentication
const bcrypt = require("bcrypt");

//Create new router object for users
const usersRouter = require("express").Router();

//Import User model from models directorys
const User = require("../models/user");
const { info } = require("../utils/logger");

//Get the users route handler
usersRouter.get("/", async (request, response) => {
  //Populate method picks the blogs id filed and gets the reference object values of that id
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
});

//Get the users route handler
usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  return response.status(200).json(user);
});

//Add user route handler
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response
      .status(400)
      .send({ error: "Password must be at least 3 characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  console.log("USER BEFORE POST:", user);

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
