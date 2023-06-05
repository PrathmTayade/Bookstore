from pydantic import BaseModel

class Book(BaseModel):
    _id: str
    title: str
    author: str
    description: str
    cover_image: str
    price: float
    rating: int


class BookCreate(BaseModel):
    title: str
    author: str
    description: str
    cover_image: str
    price: float
    rating: int
