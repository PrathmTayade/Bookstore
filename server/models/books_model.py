from bson.objectid import ObjectId
from pydantic import BaseModel
from datetime import datetime
from typing import List


class Book(BaseModel):
    title: str
    author: str
    description: str
    cover_image: str
    price: float
    rating: int


class PublishedDate(BaseModel):
    date: datetime


class NewBooks(BaseModel):
    _id: int
    title: str
    isbn: str
    pageCount: int
    publishedDate: PublishedDate
    thumbnailUrl: str
    shortDescription: str
    longDescription:str
    status: str
    authors: List[str]
    categories: List[str]
    rating: int
    price:int


class BookCreate(BaseModel):
    title: str
    author: str
    description: str
    cover_image: str
    price: float
    rating: int
