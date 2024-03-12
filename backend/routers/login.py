from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from .tables import User
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy.ext.declarative import declarative_base
import smtplib
import os
import random
from dotenv import load_dotenv
from . import get_db
from sqlalchemy.orm import Session
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

router = APIRouter()

# Load environment variables from .env file
load_dotenv()

# Base class for declarative models
Base = declarative_base()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 password bearer for token URL
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Pydantic model for user login
class Login(BaseModel):
    username: str
    password: str

# Function to verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Login endpoint
@router.post("/login")
async def login(user: Login, db: Session = Depends(get_db)):
    # Check if logging in using either email or username
    if user.username:
        user_details = db.query(User).filter(User.username == user.username).first()
    elif '@' in user.username:
        user_details = db.query(User).filter(User.email == user.username).first()

    # Comparing the password with the hashed password
    if user_details:
        if verify_password(user.password, user_details.password):
            return {"message": "Login Successful", "email": user_details.email, "username": user_details.username, "name": user_details.name}
        else:
            return {"message": "Incorrect password"}  # Incorrect password

    return {"message": "Incorrect email or username"}  # Incorrect username or email