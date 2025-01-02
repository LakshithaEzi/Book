import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./Components/SearchBar";
import BookList from "./Components/BookList";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); // To keep track of the search query
  const [currentPage, setCurrentPage] = useState(1); // To keep track of the current page
  const maxResults = 20; // Maximum books per page

  const fetchBooks = async (searchQuery, page = 1) => {
    setLoading(true);
    try {
      const startIndex = (page - 1) * maxResults; // Calculate the start index for the API call
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
      setBooks(response.data.items || []);
      setQuery(searchQuery); // Update the current search query
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (books.length === maxResults) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    if (query) {
      fetchBooks(query, currentPage);
    }
  }, [currentPage]);

  return (
    <div className="container min-h-screen p-4 mx-auto bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Book Search App</h1>
        <div className="ml-auto">
          <SearchBar onSearch={(searchQuery) => fetchBooks(searchQuery)} />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <>
          <BookList books={books} />
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <IoMdArrowRoundBack />
            </button>
            <p className="px-4 py-2 text-xl text-gray-800">Page {currentPage}</p>
            <button
              onClick={handleNextPage}
              disabled={books.length < maxResults}
              className="px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <IoMdArrowRoundForward />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;