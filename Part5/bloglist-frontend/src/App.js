import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  //Use Effect only run when state is empty array(initial rendering): Get all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  //Use Effect only run when state is empty array(initial rendering): Check if user is logged in already
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      //noteService.setToken(user.token)
    }
  }, []);

  //When submit login form button is clicked
  const handleLogin = async (event) => {
    event.preventDefault();
    const userInfo = { username: username, password: password };
    try {
      //Login user
      const user = await userService.login(userInfo);
      //Set state user with user
      setUser(user);
      //Set user token in blogService
      blogService.setToken(user.token);
      //Save user information in local storage
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      //Reset state variables for username and password in the login form
      setUsername("");
      setPassword("");
      //Notification messages in case of success or failure
      setNotificationMessage(`Welcome ${username}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    //Remove user from local storage and from state
    if (user) {
      window.localStorage.removeItem("loggedBlogAppUser");
      setUser(null);
    }
  };

  //Function to handle creation of new blog
  const handleNewBlog = async () => {
    //Send request to blog service to create new blog
    try {
      //get state blog info
      const blog = { author: blogAuthor, title: blogTitle, url: blogUrl };

      //Set user token in blogService
      blogService.setToken(user.token);
      //Create new blog request
      const newBlog = await blogService.addBlog(blog);
      //set state variables
      setBlogs(blogs.concat(newBlog));
      setBlogTitle("");
      setBlogAuthor("");
      setBlogUrl("");

      //Add success notification
      setNotificationMessage(`Welcome ${username}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
    } catch (exception) {
      //Add notification error message in case of error creating new blog
      console.log("ERROR CREATING BLOG: ", exception);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={notificationMessage}
          error={errorMessage}
        ></Notification>
        <form onSubmit={handleLogin}>
          <div>
            {" "}
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            {" "}
            password{" "}
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />{" "}
          </div>{" "}
          <button type="submit">login</button>{" "}
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <Notification
          message={notificationMessage}
          error={errorMessage}
        ></Notification>
        <h2>blogs</h2>
        <h3>
          {user.username} is logged in{" "}
          <button onClick={handleLogout}>Logout</button>
        </h3>
        {/*Form to create a new blog*/}
        <form>
          <div>
            {" "}
            title:
            <input
              type="text"
              value={blogTitle}
              name="BlogTitle"
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            {" "}
            author:{" "}
            <input
              type="text"
              value={blogAuthor}
              name="BlogAuthor"
              onChange={({ target }) => setBlogAuthor(target.value)}
            />{" "}
          </div>{" "}
          <div>
            {" "}
            url:{" "}
            <input
              type="url"
              value={blogUrl}
              name="BlogUrl"
              onChange={({ target }) => setBlogUrl(target.value)}
            />{" "}
          </div>{" "}
          <button type="button" onClick={handleNewBlog}>
            create
          </button>{" "}
        </form>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
