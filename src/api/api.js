import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Updated to use the new MongoDB backend
});

export const fetchPosts = async (page = 1, limit = 20) => {
  // If limit is large, fetch all posts without pagination
  if (limit >= 20) {
    const response = await API.get('/posts');
    return response.data;
  }
  
  // Otherwise use pagination
  const response = await API.get(`/posts?page=${page}&limit=${limit}`);
  return response.data;
};

export const fetchComments = async (postId) => {
  const response = await API.get(`/comments/post/${postId}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await API.post('/posts', postData);
  return response.data;
};

export const createComment = async (commentData) => {
  const response = await API.post('/comments', commentData);
  return response.data;
};

export const updatePost = async (postId, postData) => {
  const response = await API.put(`/posts/${postId}`, postData);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await API.delete(`/posts/${postId}`);
  return response.data;
};
