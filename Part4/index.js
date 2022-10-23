const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const { info, error } = require("./utils/logger");
const Blog = require("./models/blog");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

//Get all blogs
app.use("/api/blogs", blogsRouter);

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`);
});
