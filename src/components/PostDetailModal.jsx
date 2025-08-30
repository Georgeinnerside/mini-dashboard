import React from "react";
import formatTitle from "../lib/helper";
import { X } from "lucide-react";

const PostDetailModal = ({ isOpen, isClose, post }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
      {/* button to close modal after view */}
        <button
          onClick={isClose}
          className="absolute top-3 right-3 p-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 cursor-pointer"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold p-4 mb-4 text-gray-800 dark:text-gray-100">
          {formatTitle(post.title)}
        </h2>

        <p className="text-gray-700 p-4 dark:text-gray-200 whitespace-pre-wrap">
          {post.body}
        </p>
      </div>
    </div>
  );
};

export default PostDetailModal;
