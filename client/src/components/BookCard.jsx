/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartSelector, removeFromCart } from "../redux/cartSlice";
import { toast } from "react-hot-toast";

const BookCard = ({ book }) => {
  const cart = useSelector(cartSelector);
  const dispatch = useDispatch();

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + " ...";
    }
    return description;
  };

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    toast.success("Added to cart");
  };

  return (
    <div
      key={book.id}
      className="group relative bg-white rounded-md shadow-md p-4 "
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
        <img
          src={book.cover_image}
          alt={book.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full transition duration-400 hover:scale-90 hover:object-contain"
        />
      </div>
      <div className="mt-4 flex flex-col justify-between">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {book?.author !== "" ? book.author : "Unknown"}
          </p>
          <p className="mt-2 text-gray-700 line-clamp-3 text-ellipsis">
            {book.description}
          </p>
          <div className="mt-4 flex items-center">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Star</title>
              <path
                fillRule="evenodd"
                d="M10 16.22l-3.68 2.3a1 1 0 01-1.48-1.05l.99-4.38-3.31-2.86a1 1 0 01.55-1.75l4.43-.38 1.73-4.03a1 1 0 011.8 0l1.73 4.03 4.43.38a1 1 0 01.55 1.75l-3.31 2.86.99 4.38a1 1 0 01-1.48 1.05L10 16.22z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-1 text-sm text-gray-500">{book.rating}</p>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 flex justify-between items-center ">
          <p className="text-lg font-medium text-gray-900">
            &#8377; {book.price}
          </p>
          {cart.items.some((item) => item._id === book._id) ? (
            <button
              type="button"
              className="px-4 py-2 mt-2 lg:mt-0 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition duration-300"
              onClick={() => {
                dispatch(removeFromCart(book._id));
              }}
            >
              Remove
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="px-4 py-2 mt-2 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition duration-300"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
