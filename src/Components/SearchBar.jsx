import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import the search icon

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) onSearch(query);
  };

  return (
    <div className="relative w-[300px]  rounded-md font-poppins">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        className="w-full p-2 transition duration-300 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-white transition-all bg-blue-500 rounded-full hover:bg-blue-600 active:bg-blue-800"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;