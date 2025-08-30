import { useState } from "react";

const SearchBar = ({ onSearch, onCreate }) => {
  const [searchKey, setSearchKey] = useState("");

  // compoent fot searching post with keywords
  return (
    <div className="gap-3 mb-2">
      <input
        type="text"
        value={searchKey}
        onChange={(e) => {
          setSearchKey(e.target.value);
          onSearch(e.target.value);
        }}
        className="text-gray-800 px-3 py-2 border rounded-md dark:text-gray-200 focus:outline-none focus:ring-1  w-full"
      />
    </div>
  );
};

export default SearchBar;
