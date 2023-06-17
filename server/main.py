from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router.books_router import books_router
from router.auth import auth_router

app = FastAPI()

origins = ["http://localhost:5173"]
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Welcome to Bookstore API"}


app.include_router(books_router)
app.include_router(auth_router)
