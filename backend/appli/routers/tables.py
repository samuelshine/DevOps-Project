from fastapi import APIRouter
from sqlalchemy import ARRAY, Date, Integer, PrimaryKeyConstraint, Column, String, DateTime
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

Base.metadata.create_all(bind=engine)