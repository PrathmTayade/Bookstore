from fastapi import APIRouter
from models.books_model import Book, NewBooks, BookCreate
from database.db import collection, newbooks_collection

import json
import random

books_router = APIRouter()


@books_router.get("/books")
async def get_books():
    books = []
    for book in collection.find():
        book["_id"] = str(book["_id"])
        books.append(book)
    return books


@books_router.get("/newbooks")
async def get_newbooks():
    # Retrieve all books from the collection
    books_data = newbooks_collection.find()

    # Convert MongoDB documents to list of dictionaries
    books = [book for book in books_data]

    return books


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


@books_router.post("/newbooks/search")
def search_books(search_terms: dict):
    query = {}

    categories = search_terms.get("categories")
    if categories:
        query["categories"] = {"$in": categories.split(",")}

    title = search_terms.get("title")
    if title:
        query["title"] = {"$regex": title, "$options": "i"}

    author = search_terms.get("author")
    if author:
        query["authors"] = {"$elemMatch": {"$regex": author, "$options": "i"}}

    min_price = search_terms.get("minPrice")
    max_price = search_terms.get("maxPrice")
    if min_price and max_price:
        query["price"] = {
            "$gte": int(min_price),
            "$lte": int(max_price),
        }
    elif min_price:
        query["price"] = {"$gte": int(min_price)}
    elif max_price:
        query["price"] = {"$lte": int(max_price)}

    books = newbooks_collection.find(query)
    result = [book for book in books]
    return result


@books_router.get("/books/advancesearch")
def search_books(
    search: str = None,
    category: str = None,
    price_range: str = None,
    publication_date: str = None,
):
    query = {}
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"author": {"$regex": search, "$options": "i"}},
            {"category": {"$regex": search, "$options": "i"}},
        ]
    if category:
        query["genre"] = category
    if price_range:
        min_price, max_price = price_range.split("-")
        query["price"] = {"$gte": int(min_price), "$lte": int(max_price)}
    # if publication_date:
    #     start_date, end_date = publication_date.split("-")
    #     query["publication_date"] = {
    #         "$gte": datetime.strptime(start_date, "%Y-%m-%d"),
    #         "$lte": datetime.strptime(end_date, "%Y-%m-%d"),
    #     }
    books = collection.find(query)
    return [Book(**book) for book in books]


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


# def upload_books():
#     with open("books.json") as f:
#         books = json.load(f)
#     for book in books:
#         book["rating"] = random.randint(1, 5)
#         book["price"] = random.randint(100, 1000)
#         newbooks_collection.insert_one(book)

# return {"message": "Books uploaded successfully!"}


# upload_books()
