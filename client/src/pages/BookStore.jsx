import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";

const BookStore = () => {
  const [booksList, setBooksList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getBooks();
    // check if logged in
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

  // Logout
  const handleLogout = async () => {
    await axios.get(import.meta.env.VITE_SERVER + "/logout", {
      withCredentials: true,
    });

    toast.success("Logged Out Successfully");
    setIsAuthenticated(false);
  };

  return (
    <>
      <div>
        <Toaster toastOptions={{ duration: 1500 }} />
      </div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="container flex-1 w-screen scroll-smooth ">
          <div className=" flex  grid-flow-row grid-cols-fluid  flex-col justify-center gap-6 p-6 text-gray-900   md:grid md:grid-cols-3    ">
            {booksList.map((book, index) => (
              <div key={index}>
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
