from fastapi import APIRouter
from sqlalchemy import ARRAY, Date, Integer, PrimaryKeyConstraint, Column, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from . import engine


router = APIRouter()

Base = declarative_base()

class User(Base):
    __tablename__ = "userdetails"

    email = Column(String)
    mobile_number =  Column(String, default=None)
    username = Column(String, primary_key=True, index=True)
    password = Column(String)
    name = Column(String)
    date_of_birth = Column(Date, default=None)

class Posts(Base):
    __tablename__ = "posts"

    post_id = Column(Integer, primary_key=True)
    username = Column(String, ForeignKey("userdetails.username"))
    image_file_name = Column(String)
    caption = Column(String)

Base.metadata.create_all(bind=engine)