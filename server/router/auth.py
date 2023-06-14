from fastapi import HTTPException, APIRouter
from pydantic import BaseModel, EmailStr, constr
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
from database.db import users_collection
from jose import JWTError, jwt


class User(BaseModel):
    name: str
    email: str
    password: str


class LoginUserSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=6)


SECRET_KEY = "analystai"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

auth_router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(email: str):
    user = users_collection.find_one({"email": email})
    if user:
        return user


def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user:
        return False
    if not verify_password(password, user["password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@auth_router.post("/login")
async def login(form_data: LoginUserSchema):
    print(form_data)
    user = authenticate_user(form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.post("/signup")
async def signup(user: User):
    hashed_password = get_password_hash(user.password)
    new_user = {"name": user.name, "email": user.email, "password": hashed_password}
    users_collection.insert_one(new_user)
    return {"message": "User created successfully"}
