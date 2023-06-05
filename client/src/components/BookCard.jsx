/* eslint-disable react/prop-types */
import "./bookCard.css";

const BookCard = ({ book }) => {
  return (
    <div className="card">
      <img className="cover-image" src={book.cover_image} alt="Book Cover" />
      <div className="card-content">
        <h2 className="title">{book.title}</h2>
        <p className="author">Author: {book.author}</p>
        <p className="description">{book.description}</p>
        <p className="price">Price: ${book.price}</p>
        <p className="rating">Rating: {book.rating}</p>
      </div>
    </div>
  );
};

export default BookCard;
