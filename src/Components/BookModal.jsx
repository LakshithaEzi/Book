import React from "react";

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 sm:w-3/4 lg:w-1/3 p-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-800"
        >
          X
        </button>
        <div className="flex flex-col items-center">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
            alt={book.volumeInfo.title}
            className="object-cover w-32 h-48 mb-4 rounded"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{book.volumeInfo.title}</h2>
          <p className="mt-2 text-lg text-gray-600">
            <strong>Author(s):</strong> {book.volumeInfo.authors?.join(", ") || "Unknown"}
          </p>
          <p className="mt-4 text-gray-700">{book.volumeInfo.description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;