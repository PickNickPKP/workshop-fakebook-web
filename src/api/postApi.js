import axios from "axios";

export const postApi = axios.create({
  baseURL: 'http://localhost:8899/api/posts'
});

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
})

export const createPost = (body , token) => postApi.post('/', body, addToken(token));

export const getAllPosts = (token) => postApi.get('/', addToken(token));

export const deletePost = (id, token) => postApi.delete(`/${id}`, addToken(token));