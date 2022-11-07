import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const login = async (userCredentials) => {
  const response = await axios.post(baseUrl + "/login", userCredentials);
  return response.data;
};

export default { getAll, login };
