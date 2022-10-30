const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "TypeError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }
  //Move control to next middleware
  next(error);
};

//Extract the token from request middleware
const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  //Pass control to next middleware(this case all other routes will have now the token)
  next();
};

//Extract the user from token and add it to request middleware
const userExtractor = async (request, response, next) => {
  //Get the token from the request
  const token = request.token;

  //If authorization request is required get the user from database
  if (token) {
    //Get the user object {username, id} decoded from the token verify function
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    //get the user who made the request
    const user = await User.findById(decodedToken.id);
    request.user = user;
  } else {
    request.user = null;
  }

  //Pass control to next middleware(this case all other routes will have now the user)
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor,
};
