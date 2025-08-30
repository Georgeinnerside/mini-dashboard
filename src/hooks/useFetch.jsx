import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

import axios from "axios";

export const useFetch = () => {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const URL = "https://jsonplaceholder.typicode.com/posts";

  // fetch API for post, with useCallback
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(URL, {
        headers: { "Content-type": "application/json" },
      });

      const data = response.data;
      setPostData(data);
    } catch (error) {
      setError(error.message || "failed to fetch");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  });

  //  pass the function in a useEffect, with an empty dependency as second argument
  useEffect(() => {
    fetchUserData();
  }, []);

  // create a function for post
  const createPost = async (newPost) => {
    try {
      const response = await axios.post(URL, newPost, {
        headers: { "Content-type": "application/json" },
      });
      const postWithId = { ...newPost, id: crypto.randomUUID() };
      setPostData((prev) => [postWithId, ...prev]);
      toast.success("Post added successfully!");
    } catch (error) {
      setError(error.message);
      toast.error("Failed to add post");
    } finally {
      setIsLoading(false);
    }
  };

  // function to edit posted data
  const updatePost = async (editPost) => {
    try {
      await axios.put(`${URL}/${editPost.id}`, editPost);
      setPostData((prev) =>
        prev.map((post) => (post.id === editPost.id ? editPost : post))
      );
      toast.success("Post updated successfully!");
    } catch (error) {
      setError("Failed to update post");
      toast.error("Failed to update post");
    } finally {
      setIsLoading(false);
    }
  };

  // function to delete post
  const deletePost = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setPostData((prev) => prev.filter((post) => post.id !== id));
      toast.success("Post deleted successfully!");
    } catch (error) {
      setError("failed to fetch error");
      toast.error("Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, createPost, updatePost, deletePost, isLoading, error };
};

export default useFetch;
