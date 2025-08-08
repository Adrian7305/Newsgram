import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // adjust if your json-server is hosted elsewhere
});

export const fetchPosts = async (page = 1, limit = 5) => {
  const response = await API.get(`/posts?_page=${page}&_limit=${limit}`);
  return response.data;
};
