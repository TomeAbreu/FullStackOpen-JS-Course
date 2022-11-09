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

const updateBlog = async (blog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(baseUrl + `/${blog.id}`, blog, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(baseUrl + `/${blogId}`, config);
  return response.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { getAll, addBlog, updateBlog, deleteBlog, setToken };
