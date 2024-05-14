from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from . import get_db
from .tables import Profile
from typing import List

router = APIRouter()

class Follow(BaseModel):
    follower: str
    following: str

@router.post("/follow")
async def follow(follow: Follow, db: Session = Depends(get_db)):
    profile_follower = db.query(Profile).filter(Profile.username == follow.follower).first()
    profile_following = db.query(Profile).filter(Profile.username == follow.following).first()


    if not profile_follower or not profile_following:
        raise HTTPException(status_code=404, detail="User not found")

    # Add following user to the follower's following list
    if follow.following not in profile_follower.following:
        new_following=profile_follower.following+[follow.following]
        profile_follower.following=new_following
        #profile_follower.following.append(follow.following)
        print(profile_follower.following)

    # Add follower user to the following user's followers list
    if follow.follower not in profile_following.followers:
        new_followers=profile_following.followers+[follow.follower]
        profile_following.followers=new_followers
        #profile_following.followers.append(follow.follower)
        print(profile_following.followers)

    db.commit()
    print("Hi")
    return JSONResponse(content={"message": "Followed successfully"})

@router.post("/unfollow")
async def unfollow(follow: Follow, db: Session = Depends(get_db)):
    profile_follower = db.query(Profile).filter(Profile.username == follow.follower).first()
    profile_following = db.query(Profile).filter(Profile.username == follow.following).first()

    if not profile_follower or not profile_following:
        raise HTTPException(status_code=404, detail="User not found")

    # Remove following user from the follower's following list
    if follow.following in profile_follower.following:
        new_following = [user for user in profile_follower.following if user != follow.following]
        profile_follower.following = new_following
        print(profile_follower.following)

    # Remove follower user from the following user's followers list
    if follow.follower in profile_following.followers:
        new_followers = [user for user in profile_following.followers if user != follow.follower]
        profile_following.followers = new_followers
        print(profile_following.followers)

    db.commit()
    print("Bye")
    return JSONResponse(content={"message": "Unfollowed successfully"})

@router.get("/isfollowing")
async def is_following(follower: str, following: str, db: Session = Depends(get_db)):
    profile_follower = db.query(Profile).filter(Profile.username == follower).first()
    profile_following = db.query(Profile).filter(Profile.username == following).first()

    if not profile_follower or not profile_following:
        raise HTTPException(status_code=404, detail="User not found")

    return {"is_following": follower in profile_following.followers}