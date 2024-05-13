from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from . import get_db
from .tables import Profile
from typing import List

router = APIRouter()

@router.post("/follow")
async def follow(follower: str, following: str, db: Session = Depends(get_db)):
    profile_follower = db.query(Profile).filter(Profile.username == follower).first()
    profile_following = db.query(Profile).filter(Profile.username == following).first()

    print("hello")

    if not profile_follower or not profile_following:
        raise HTTPException(status_code=404, detail="User not found")

    # Add following user to the follower's following list
    if following not in profile_follower.following:
        profile_follower.following.append(following)

    # Add follower user to the following user's followers list
    if follower not in profile_following.followers:
        profile_following.followers.append(follower)

    db.commit()
    return JSONResponse(content={"message": "Followed successfully"})

@router.get("/isfollowing")
async def is_following(follower: str, following: str, db: Session = Depends(get_db)):
    profile_follower = db.query(Profile).filter(Profile.username == follower).first()
    profile_following = db.query(Profile).filter(Profile.username == following).first()

    if not profile_follower or not profile_following:
        raise HTTPException(status_code=404, detail="User not found")

    return {"is_following": following in profile_follower.following}