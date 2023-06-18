import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useGetBooksListQuery, useGetNewBooksListQuery } from "../apis/apis";

const BookStore = () => {
  const [booksList, setBooksList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  // Initial data fetching
  useEffect(() => {
    getBooks();
    // Check if logged in
  }, []);

  const { data, isFetching } = useGetNewBooksListQuery();
  const getBooks = async () => {
    setLoading(true);

    try {
      const res = await axios.get(import.meta.env.VITE_SERVER + "/books");
      if (res.status === 200) {
        setBooksList(res.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error performing search:", error);
      toast.error(error);
    }
  };

  const handleSearch = async (data) => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_SERVER + `/books/search?search=${data.search}`
      );
      const results = await res.data;
      if (res.status === 200) {
        setBooksList(results);
      }
    } catch (error) {
      console.error("Error performing search:", error);
      toast.error(error);
    }
  };

  const handleClearSearch = async () => {
    getBooks(); // Fetch all data again
  };

  if (data) {
    return (
      <>
        <div>
          <Toaster toastOptions={{ duration: 1500 }} />
        </div>

        <div className=" mx-auto max-w-2xl p-4 sm:px-6  lg:max-w-7xl lg:px-8 ">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />{" "}
          {/* Pass onClear function to SearchBar */}
          {isFetching ? (
            <div>loading</div>
          ) : (
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 p-4">
              {data.map((book) => (
                <div key={book._id}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
};

export default BookStore;
