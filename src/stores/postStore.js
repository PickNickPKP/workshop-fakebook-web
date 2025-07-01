import { create } from "zustand";
import { createPost, deletePost, getAllPosts } from "../api/postApi";
import useUserStore from "./userStore";

const usePostStore = create((set, get) => ({
  posts: [],
  currentPost: null, //for edit post
  loading: false, // for loading state
  createPost: async (body, token, user) => {
    set({ loading: true });
    const resp = await createPost(body, token);
    set({loading: false });
    // way 1
    // get().getAllPosts(); // not need token here because it is already in userStore //but it too slow cause 2 method get and post. 
    // another way is to update posts in store directly
    // way 2
    set((state) => ({
      posts: [{ ...resp.data.result, user, likes: [], comments: [] }, ...state.posts],
    })); // rs from post.controller.js
    return resp;
  },
  getAllPosts: async () => {
    // loading another method 
    await new Promise(rs=>setTimeout(rs,2000) )
    // console.log(token)
    let tk = useUserStore.getState().token;
    const resp = await getAllPosts(tk);  //tk is token from userStore ดึงจาก Store อื่นได้
    set({posts: resp.data.posts });
    return resp;
  },
  deletePost: async (id) => {
    let tk = useUserStore.getState().token; //tk is token from userStore ดึงจาก Store อื่นได้
    const resp = await deletePost(id, tk);
    get().getAllPosts(); // refresh posts after delete
    return resp;
  },
  setCurrentPost:  (post) => set ({ currentPost: post})
}))
 

export default usePostStore;































 // createPost: async (body, token, user) => {
  //   set((state) => ({
  //     loading: false,
  //     posts: [
  //       { ...rs.data.result, user, liks: [], comments: [] },
  //       ...state.posts,
  //     ], // rs from post.controller.js
  //   }));
  // },
  // getAllPosts: async (token) => {
  //   set({ loading: true });
  //   const rs = await getAllPosts(token);
  //   set({
  //     posts: rs.data.result,
  //     loading: false,
  //   });
  // },
  // deletePost: async (postId, token) => {
  //   const rs = await deletePost(postId, token);
  //   set((state) => ({
  //     posts: state.posts.filter((post) => post._id !== postId),
  //   }));
  // },
  // updatePost: async (postId, body, token) => {
  //   const rs = await updatePost(postId, token, body);
  // },
  // createComment: async (body, token) => {
  //   const rs = await createComment(body, token);
  // },
  // createLike: async (body, token) => {
  //   const rs = await createLike(body, token);
  // },
  // unLike: async (body, id) => {
  //   const rs = await unLike(body, id);
  // },
  // setCurrentPost: (post) => set({ currentPost: post }),
// }));