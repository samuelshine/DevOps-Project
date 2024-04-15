from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import accounts
from routers import login
from routers import passwordmanipulation
from routers import profile
from routers import posts

app=FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login.router)
app.include_router(accounts.router)
app.include_router(posts.router)
app.include_router(passwordmanipulation.router)
app.include_router(profile.router)


@app.get('/')
def root():
    return {'root': '/'}