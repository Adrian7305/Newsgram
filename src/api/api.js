import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // adjust if your json-server is hosted elsewhere
});

export const fetchPosts = async (page = 1, limit = 20) => {
  // If limit is large, fetch all posts without pagination
  if (limit >= 20) {
    const response = await API.get('/posts');
    return response.data;
  }
  
  // Otherwise use pagination
  const response = await API.get(`/posts?_page=${page}&_limit=${limit}`);
  return response.data;
};

export const fetchComments = async (postId) => {
  const response = await API.get(`/comments?postId=${postId}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await API.post('/posts', postData);
  return response.data;
};
