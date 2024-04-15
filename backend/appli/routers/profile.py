from fastapi import APIRouter, File, UploadFile, Form, Depends
from fastapi.responses import JSONResponse
from pathlib import Path
from . import get_db
from sqlalchemy.orm import Session
from .tables import Profile
import base64

router = APIRouter()

@router.post("/createprofile")
async def create_profile(username: str = Form(...), display_name: str = Form(...), bio: str = Form(...), image: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Ensure the 'profile_images' directory exists
        Path("profile_images").mkdir(parents=True, exist_ok=True)

        # Save the image to the 'profile_images' directory with the username as the filename
        image_filename = f"profile_images/{username}.jpg"
        with open(image_filename, "wb") as f:
            f.write(image.file.read())

        # Create a new profile record in the database
        new_profile = Profile(username=username, display_name=display_name, bio=bio, profile_picture=image_filename.replace("profile_images/", ""), posts=[], followers=[], following=[])
        db.add(new_profile)
        db.commit()

        return {"message": "Profile created successfully"}
    except Exception as e:
        print(e)
        return {"message": f"Failed to create profile: {e}"}
    
@router.get("/getprofile/{username}")
async def get_profile(username: str, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.username == username).first()

    if profile:
        # Read the image file
        image_filename = profile.profile_picture
        image_filepath = f"profile_images/{image_filename}"
        with open(image_filepath, "rb") as f:
            image_data = base64.b64encode(f.read()).decode('utf-8')

        return {
            "username": profile.username,
            "display_name": profile.display_name,
            "bio": profile.bio,
            "profile_picture": image_data,
            "followers_count": len(profile.followers),
            "following_count": len(profile.following),
            "posts_count": len(profile.posts)
        }
    else:
        return JSONResponse(content={"message": "Profile not found"}, status_code=404)
