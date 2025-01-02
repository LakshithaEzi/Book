import React, { useState, useEffect } from "react";
import BookModal from "./BookModal";

const BookList = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null); // State for selected book
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Lock body scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    }

    return () => {
      document.body.style.overflow = "auto"; // Clean up in case the component is unmounted
    };
  }, [isModalOpen]);

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true); // Open modal when button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null); // Clear selected book when modal is closed
  };

  return (
    <div>
      {/* Background overlay when modal is open */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50 pointer-events-auto" />
      )}

      <div
        className={`grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
          isModalOpen ? "pointer-events-none" : ""
        }`}
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col p-4 transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:transform hover:scale-105"
          >
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
              alt={book.volumeInfo.title}
              className="object-cover w-32 h-48 mx-auto mb-3 rounded"
            />
            <h2 className="mb-2 text-lg font-semibold text-gray-800 border-b border-gray-200">
              {book.volumeInfo.title}
            </h2>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Author(s):</span>{" "}
              {book.volumeInfo.authors?.join(", ") || "Unknown"}
            </p>
            <p className="mb-4 text-sm text-gray-700 line-clamp-3">
              {book.volumeInfo.description || "No description available."}
            </p>
            <div className="mt-auto">
              <button
                onClick={() => handleViewDetails(book)}
                className="w-full px-4 py-2 text-sm text-white transition bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <BookModal book={selectedBook} onClose={handleCloseModal} />}
    </div>
  );
};

export default BookList;