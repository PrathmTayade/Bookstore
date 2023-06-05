from fastapi import APIRouter
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pymongo import MongoClient
from passlib.context import CryptContext
from database.db import users_collection
from pydantic import BaseModel


auth_router = APIRouter()
security = HTTPBasic()
pwd_context = CryptContext(schemes=["bcrypt"])


class User(BaseModel):
    name: str
    email: str
    password: str


@auth_router.post("/login")
async def login(credentials: HTTPBasicCredentials):
    print(credentials)
    password = pwd_context.verify(
        credentials.password,
        "$2b$12$sIjA79Uk2Ky6xrmAsBw64u42q4vnRxKPjYjVMgGGmE9/lIaiJuVnG",
    )

    return {"message": "Login successful", "password": password}


@auth_router.post("/signup")
def signup(user: User):
    hashed_password = pwd_context.hash(user.password)
    user_data = {"email": user.email, "password": hashed_password}

    return user_data
