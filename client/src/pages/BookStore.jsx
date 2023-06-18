import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useGetNewBooksListQuery, useSearchBooksQuery } from "../apis/apis";

const BookStore = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  // Initial data fetching
  useEffect(() => {
    // Check if logged in
  }, []);

  const { data: newBooksData, isFetching: isFetchingNewBooks } =
    useGetNewBooksListQuery();
  const { data: searchBooksData, isFetching: isFetchingSearchBooks } =
    useSearchBooksQuery(searchTerm);

  const handleSearch = async (data) => {
    setSearchTerm(data.search);
  };

  const handleClearSearch = async () => {
    setSearchTerm(""); // Fetch all new books again
  };

  return (
    <>
      <div>
        <Toaster toastOptions={{ duration: 1500 }} />
      </div>

      <div className="mx-auto max-w-2xl p-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />{" "}
        {/* Pass onClear function to SearchBar */}
        {isFetchingNewBooks || isFetchingSearchBooks ? (
          <div>Loading...</div>
        ) : (
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 p-4">
            {searchTerm
              ? searchBooksData.map((book) => (
                  <div key={book._id}>
                    <BookCard book={book} />
                  </div>
                ))
              : newBooksData?.map((book) => (
                  <div key={book._id}>
                    <BookCard book={book} />
                  </div>
                ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BookStore;
