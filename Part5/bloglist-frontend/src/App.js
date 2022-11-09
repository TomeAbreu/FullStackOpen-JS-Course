import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  //Use state variables
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const newBlogRef = useRef();

  //Use Effect only run when state is empty array(initial rendering): Get all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  //Use Effect only run when state is empty array(initial rendering):
  //Check if user is logged in in local storage and set state user variable and save token in blogService
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
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
      setErrorMessage("Wrong user credentials");
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

  //Function to be called back from Blog to update blog number of likes
  const updateBlogLikes = (blogId, newLikes) => {
    //Find blog with same id in blogs state variable
    const blogsUpdated = blogs.map((blog) => {
      if (blog.id === blogId) {
        blog.likes = newLikes;
      }
      return blog;
    });

    setBlogs(blogsUpdated);
  };

  //Function to handle creation of new blog
  const handleNewBlog = async (blog) => {
    //Access to visibility function to hide form in Toggable component
    newBlogRef.current.toggleVisibility();
    //Send request to blog service to create new blog
    try {
      //Create new blog request
      const newBlog = await blogService.addBlog(blog);

      //set state variables
      setBlogs(blogs.concat(newBlog));

      //Add success notification
      setNotificationMessage(
        `A new blog ${newBlog.title} by ${newBlog.author} added`
      );
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
    } catch (exception) {
      //Add notification error message in case of error creating new blog
      setErrorMessage(`Could not create a new blog`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
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
        <Togglable buttonLabel="new blog" ref={newBlogRef}>
          <NewBlogForm handleNewBlog={handleNewBlog}></NewBlogForm>
        </Togglable>

        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogLikesCallBack={updateBlogLikes}
            />
          ))}
      </div>
    );
  }
};

export default App;
