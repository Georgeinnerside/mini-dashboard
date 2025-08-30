import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../hooks/useFetch";
import { motion } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PostCard from "../components/PostCard";
import EditPostModal from "../components/EditPostModal";
import PostFormModal from "../components/PostFormModal";
import PostDetailModal from "../components/PostDetailModal";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const { postData, createPost, updatePost, deletePost, isLoading, error } =
    useFetch();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  // tanstack query for search
  const { data: filteredPosts = [] } = useQuery({
    queryKey: ["searchTerm", searchTerm, postData],
    queryFn: () =>
      postData.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
  });

  const postsToPaginate = searchTerm ? filteredPosts : postData;

  // use .slice() to show 6 page per render
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentPosts = postsToPaginate.slice(startIndex, endIndex);
  // recalculate call based on filter
  const totalPages = Math.ceil(postsToPaginate.length / limit);

  // actions  for create, post, edit and delete
  const editActions = (user) => {
    setSelectedPost(user);
    setIsEditOpen(true);
  };

  const deleteAction = (id) => {
    deletePost(id);
  };

  const saveEditAction = () => {
    updatePost(selectedPost);
    setIsEditOpen(false);
  };

  const addPostAction = (newPost) => {
    createPost(newPost);
    setIsAddOpen(false);
  };

  const openDetailModal = (post) => {
    setSelectedPost(post);
    setIsDetailOpen(true);
  };

  // actions for pagination
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen p-6 bg-gray-200 dark:bg-gray-950 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-200 mb-2">
          Manage your CRUD here
        </p>

        <div className="flex flex-col w-full md:flex-row md:justify-between md:items-center">
          <SearchBar
            onSearch={(term) => {
              setSearchTerm(term);
              setPage(1);
            }}
          />
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md 
            hover:bg-blue-700 mb-5"
          >
            Create Post
          </button>
        </div>

        {error && <p>Error...</p>}
        {isLoading && (
          <div className="flex items-center justify-center h-screen">
            <p className="text-gray-800 text-2xl text-center dark:text-gray-200">
              Loading...
            </p>
          </div>
        )}

        {/* motion div for smooth card transition */}
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => editActions(post)}
              onDelete={() => deleteAction(post.id)}
              onView={() => openDetailModal(post)}
            />
          ))}
        </motion.div>

        {/* pagination arrows and buttons */}
        {postsToPaginate.length > 0 && (
          <div className="flex justify-center fixed bottom-0 left-0 w-full gap-4 mt-6 mb-6">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
            >
              <ChevronLeft />
            </button>
            <span className="text-gray-700 dark:text-gray-200 cursor-pointer mt-3">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded cursor-pointer"
            >
              <ChevronRight />
            </button>
          </div>
        )}

        {/* modal for creatig a post */}
        {isAddOpen && (
          <PostFormModal
            isOpen={isAddOpen}
            isClose={() => setIsAddOpen(false)}
            onSubmit={addPostAction}
          />
        )}

        {/* modal for edit post */}
        {isEditOpen && (
          <EditPostModal
            isOpen={isEditOpen}
            isClose={() => setIsEditOpen(false)}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            onSave={saveEditAction}
          />
        )}

        {/* modal for viewing post details */}
        {isDetailOpen && (
          <PostDetailModal
            isOpen={isDetailOpen}
            isClose={() => setIsDetailOpen(false)}
            post={selectedPost}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
