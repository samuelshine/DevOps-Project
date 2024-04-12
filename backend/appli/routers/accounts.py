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

# Pydantic model for registering a new user
class RegisterUser(BaseModel):
    email: EmailStr
    username: str
    password: str
    name: str


class DeleteAccount(BaseModel):
    username: str = None
    email: EmailStr = None

# Function to send OTP to email
@router.post("/verifyemail")
async def email_verification(email: EmailStr):
    otp = str(random.random() * 1000000).replace('.', '')[:6]
    
    message = f"{otp} is your otp valid for 5 minutes."
    
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()

    # Login using environment variables for email and password
    s.login(os.getenv('EMAIL'), os.getenv('EMAIL_PASSWORD'))
    s.sendmail('&&&&&&', email, message)

    s.quit()

    return {'email': email, 'otp': otp}

# Function to check if the account exists using either email or username
def account_exists(db: Session, email=None, username=None):
    if username:
        user = db.query(User).filter(User.username == username).first()
    elif email:
        user = db.query(User).filter(User.email == email).first()
    return user is not None

# Function to create the hashed password
def get_password_hash(password):
    return pwd_context.hash(password)

# Function to send an email with the user's login details
def send_password_email(email, password, username, name):
    sender_email = os.getenv("EMAIL")
    sender_password = os.getenv("EMAIL_PASSWORD")

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = email
    msg['Subject'] = "Instagram Login Details"

    body = f"Hi {name},\nPlease use these details to login to your account.\nUsername: {username}\nEmail: {email}\nPassword: {password}"
    msg.attach(MIMEText(body, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)  # Use your SMTP server details
    server.starttls()
    server.login(sender_email, sender_password)
    server.sendmail(sender_email, email, msg.as_string())
    server.quit()

# Signup endpoint
@router.post("/createaccount")
async def create_account(user: RegisterUser, db: Session = Depends(get_db)):
    # Checking if username or email already exists in the database
    if account_exists(username=user.username, db=db):
        return {"message": "Username already exists."}
    elif account_exists(email=user.email, db=db):
        return {"message": "Email already used."}
    
    # Creating a hashed password for security purposes
    hashed_password = get_password_hash(user.password)

    # Adding user to database
    db_user = User(email=user.email, password=hashed_password, username=user.username, name=user.name)
    db.add(db_user)
    db.commit()

    # Sending email about the details
    send_password_email(user.email, user.password, user.username, user.name)

    return {"message": "User registered successfully please check your email."}

@router.get("/readaccount")
async def read_account(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()

    if user:
        return {"username": user.username, "email": user.email, "mobile number": user.mobile_number, "name": user.name, "dob": user.date_of_birth}
    else:
        return {"message": "No user found. Please register an account."}

@router.delete("/deleteaccount")
async def delete_account(user: DeleteAccount, db:Session = Depends(get_db)):
    if user.username:
        user_del = db.query(User).filter(User.username == user.username).first()
    elif user.email:
        user_del = db.query(User).filter(User.email == user.email).first()
    if user_del:
        # If the user exists, delete the user
        db.delete(user_del)
        db.commit()
        return {"message": "Account deleted."}

    return {"message": "Account not found."}