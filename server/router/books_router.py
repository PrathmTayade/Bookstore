from fastapi import APIRouter
from models.books_model import BookCreate
from models.books_model import Book
from database.db import collection

books_router = APIRouter()


@books_router.get("/books")
def get_books():
    books = collection.find()
    return [Book(**book) for book in books]


# @books_router.get("/books/{book_id}")
# def get_book(book_id: str):
#     book = collection.find_one({"_id": book_id})
#     if book:
#         return Book(**book)
#     else:
#         raise HTTPException(status_code=404, detail="Book not found")


@books_router.post("/books")
def create_book(book: BookCreate):
    new_book = {
        "title": book.title,
        "author": book.author,
        "description": book.description,
        "cover_image": book.cover_image,
        "price": book.price,
        "rating": book.rating,
    }
    result = collection.insert_one(new_book)
    new_book["_id"] = str(result.inserted_id)
    return Book(**new_book)


@books_router.get("/books/search")
def search_books(title):
    book = collection.find_one({"title": title})
    return Book(**book)


@books_router.get("/books/filter")
def filter_books(min_price: float = None, max_price: float = None):
    query = {}

    if min_price and max_price:
        query["price"] = {"$gte": min_price, "$lte": max_price}
    elif min_price:
        query["price"] = {"$gte": min_price}
    elif max_price:
        query["price"] = {"$lte": max_price}

    books = collection.find(query)
    return [Book(**book) for book in books]
