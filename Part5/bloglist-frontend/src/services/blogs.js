import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (blog) => {
  //Add token to request header
  const config = { headers: { Authorization: token } };
  //Post request to create new blog with config of header with bearer token
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { getAll, addBlog, setToken };
