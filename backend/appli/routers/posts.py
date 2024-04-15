from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from .tables import Posts
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
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pathlib import Path

router = APIRouter()

@router.post("/createpost")
async def create_post(file: UploadFile = File, caption: str = ''):
    try:
        # Ensure the 'posts' directory exists
        Path("posts").mkdir(parents=True, exist_ok=True)

        # Save the image to the 'posts' directory
        with open(f"posts/{file.filename}", "wb") as f:
            f.write(file.file.read())
        
        return JSONResponse(content={"message": "Post created successfully"})
    except Exception as e:
        print(e)
        return JSONResponse(content={"message": f"Failed to create post: {e}"}, status_code=500)