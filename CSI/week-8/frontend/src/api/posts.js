import axios from './axios';

export const getPosts = (params) => axios.get('/posts', { params });
export const getPost = (id) => axios.get(`/posts/${id}`);
export const createPost = (data, token) =>
  axios.post('/posts', data, { headers: { Authorization: `Bearer ${token}` } });
export const updatePost = (id, data, token) =>
  axios.put(`/posts/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deletePost = (id, token) =>
  axios.delete(`/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } }); 