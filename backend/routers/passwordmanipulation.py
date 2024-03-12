from fastapi import Depends, APIRouter
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.declarative import declarative_base
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import string
import os

from .tables import User
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from . import engine, get_db

router = APIRouter()

Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#class to collect email
class ForgotPassword(BaseModel):
    email: EmailStr = None
    username: str = None

#class to collect email
class ChangePassword(BaseModel):
    email: EmailStr
    password: str

Base.metadata.create_all(bind=engine)

# Function to check if the account exists using either email or username
def account_exists(db: Session, email=None, username=None):
    if username:
        user = db.query(User).filter(User.username == username).first()
    elif email:
        user = db.query(User).filter(User.email == email).first()
    return user is not None

def get_password_hash(password):
    return pwd_context.hash(password)

#function to generate 8 character password
def generate_password(length=8):
    characters = string.ascii_letters + string.digits + string.ascii_letters
    return ''.join(random.choice(characters) for _ in range(length))

#sends an email with the new password
def send_password_email(password, db: Session, email = None, username = None):
    sender_email = os.getenv("EMAIL")
    sender_password = os.getenv("EMAIL_PASSWORD")

    if username:
        user = db.query(User).filter(User.username == username).first()
        email = user.email
    elif email:
        user = db.query(User).filter(User.email == email).first()
        username = user.username

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = email
    msg['Subject'] = "Kristu Jayanti Admission Login Details"

    body = f"Your Account Password has been changed. These are the updated credentials:\nUsername: {username}\nPassword: {password}"
    msg.attach(MIMEText(body, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)  # Use your SMTP server details
    server.starttls()
    server.login(sender_email, sender_password)
    server.sendmail(sender_email, email, msg.as_string())
    server.quit()

# Function to update the password for a user
def update_password(new_password, db: Session, email = None, username = None, ):
    if email:
        user = db.query(User).filter(User.email == email).first()
    elif username is not None:
        user = db.query(User).filter(User.username == username).first()
    if user:
        user.password = new_password
        db.commit()
    else:
        raise Exception("User not found")

#api that calls the functions and enters the tuple into the tempuser table
@router.put("/forgotpassword/")
def forgot_password(user: ForgotPassword, db: Session = Depends(get_db)):
    # Checking if username or email already exists in the database
    if account_exists(username=user.username, db=db):
        password = generate_password()
        send_password_email(username=user.username, password=password, db=db)
        hashed_password = get_password_hash(password)
        update_password(username=user.username, new_password=hashed_password, db=db)
    elif account_exists(email=user.email, db=db):
        password = generate_password()
        send_password_email(email=user.email, password=password, db=db)
        hashed_password = get_password_hash(password)
        update_password(email=user.email, new_password=hashed_password, db=db)
        
    else:
        return {"message": "Account does not exist with that email"}

    return {"message": "New Password sent to the registered email."}

#api that calls the functions and enters the tuple into the tempuser table
@router.put("/changepassword/")
async def change_password(user: ChangePassword, db: Session = Depends(get_db)):
    if account_exists(user.email, db):
        send_password_email(user.email, user.password, db)
        hashed_password = get_password_hash(user.password)
        update_password(user.email, hashed_password, db)
    else:
        return {"message": "Account does not exist with that email"}

    return {"message": "Password updated successfully"}