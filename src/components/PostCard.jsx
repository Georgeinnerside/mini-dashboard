import { Edit, Trash, Eye } from "lucide-react";
import formatTitle from "../lib/helper";
import { truncatePost } from "../lib/helper";

const UserCard = ({ post, onEdit, onDelete, onView }) => {
  if (!post) return null;

  return (
    // post card details
    <div className="bg-white p-4 sm:p-6 dark:bg-gray-800 rounded-lg shadow-md flex flex-col justify-between h-full">
      <header>
        <h2 className="text-gray-800 font-bold dark:text-gray-100 line-clamp-4">
          {/* function to remove spaces and characters, changes first Letter of every word to uppercase */}
          {formatTitle(post.title)}
        </h2>
      </header>

      <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base mt-5 line-clamp-3">
        {/* truncaets post to 20 words */}
        {truncatePost(post.body, 20)}
      </p>

      <div className="flex justify-between gap-3 mt-4  text-sm text-gray-500 dark:text-shadow-gray-400">
        <div className="p-2">
          {/* triggers a modal to view all contents in postcard */}
          <button

            onClick={onView}
            className="px-2 py-1  text-gray-400 rounded hover:bg-blue-950"
          >
            <Eye className="text-gray-600 cursor-pointer" />
          </button>
        </div>
        {/* "edit" icon triggers modal for postedit, while "delete" deletes post */}
        <div className="p-2">
          <button onClick={onEdit} className="text-green-900 cursor-pointer">
            <Edit />
          </button>
          <button onClick={onDelete} className="text-red-800 cursor-pointer">
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
