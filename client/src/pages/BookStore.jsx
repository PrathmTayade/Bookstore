import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Toaster,  } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

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

  const getBooks = async () => {
    setLoading(true);
    const res = await axios.get(import.meta.env.VITE_SERVER + "/books");
    if (res.status === 200) {
      setBooksList(res.data);
      console.log(res);
    }
    setLoading(false);
  };

  const handleSearch = async (data) => {
    try {
      console.log("Search data:", data);

      const res = await fetch(
        import.meta.env.VITE_SERVER + `/books/search?search=${data.search}`
      );
      const results = await res.json();
      console.log("Search results:", results);
      if (res.status === 200) {
        setBooksList(results);
      }
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  const handleClearSearch = async () => {
    getBooks(); // Fetch all data again
  };

  return (
    <>
      <div>
        <Toaster toastOptions={{ duration: 1500 }} />
      </div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="container flex-1 w-full scroll-smooth ">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />{" "}
          {/* Pass onClear function to SearchBar */}
          <div className="flex grid-flow-row grid-cols-fluid flex-col justify-center gap-6 p-6 text-gray-900 md:grid md:grid-cols-3">
            {booksList.map((book) => (
              <div key={book._id}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BookStore;
