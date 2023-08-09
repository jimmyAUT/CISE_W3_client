/*
使用了 axios 這個庫來處理網路請求。axios 是一個用於發送 HTTP 請求的 JavaScript 函數庫，
它可以用於從前端應用程序向後端 API 發送請求，並處理 API 的響應。
定義了兩個請求函數：fetchPosts 和 createPost。這些函數可以用於從前端應用程序向後端 API
發送請求，並處理 API 的響應。
const url = "http://localhost:5000/posts";: 定義了一個常量 url，它存儲了後端 API 的 URL
Promise 是 JavaScript 中用於處理異步操作的對象，它代表一個將來可能完成或失敗的操作。當一
個操作是異步的，並且需要等待某些非同步的結果，我們可以使用 Promise 來處理這個異步操作，以便在操作完成時進行後續處理。
*/
import axios from "axios";
const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedData) =>
  axios.patch(`${url}/${id}`, updatedData);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
