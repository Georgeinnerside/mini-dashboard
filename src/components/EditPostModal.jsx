const EditPostModal = ({
  isOpen,
  isClose,
  onSave,
  selectedPost,
  setSelectedPost,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 50 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Edit Post
        </h2>

        {/* input for post title */}
        <input
          value={selectedPost.title || ""}
          onChange={(e) =>
            setSelectedPost({ ...selectedPost, title: e.target.value })
          }
          placeholder="Title"
          className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* text area for post content */}
        <textarea
          value={selectedPost.body || ""}
          onChange={(e) =>
            setSelectedPost({ ...selectedPost, body: e.target.value })
          }
          placeholder="Body"
          rows={5}
          className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* buttons for close and save edited post */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={isClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostModal;
