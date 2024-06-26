from pydantic import BaseModel
from fastapi import APIRouter, File, UploadFile, Form, Depends, HTTPException
from fastapi.responses import JSONResponse
from pathlib import Path
from . import get_db
from sqlalchemy.orm import Session
from .tables import Posts, Profile
import base64

router = APIRouter()

class UsernameRequest(BaseModel):
    username: str

@router.post("/createpost")
async def create_post(file: UploadFile = File(...), caption: str = Form(...), username: str = Form(...), db: Session = Depends(get_db)):
    new_post = Posts(username=username, image_file_name=None, caption=caption)
    db.add(new_post)
    db.commit()

    # Retrieve the autoincremented post_id
    db.refresh(new_post)

    # Rename the file to the post_id
    file_extension = Path(file.filename).suffix
    new_file_name = f"{new_post.post_id}{file_extension}"
    file_path = f"posts/{new_file_name}"
    
    try:
        # Ensure the 'posts' directory exists
        Path("posts").mkdir(parents=True, exist_ok=True)

        # Save the image with the new file name
        with open(file_path, "wb") as f:
            f.write(file.file.read())

        # Update image_file_name in the database
        new_post.image_file_name = new_file_name
        
        # Update the posts list in the Profile table
        profile = db.query(Profile).filter(Profile.username == username).first()

        # Create a new list with the existing post IDs and the new post ID
        updated_posts = profile.posts + [new_post.post_id]
        profile.posts = updated_posts

        print(profile.posts)
        db.commit()

        return JSONResponse(content={"message": "Post created successfully"})
    except Exception as e:
        print(e)
        return JSONResponse(content={"message": f"Failed to create post: {e}"}, status_code=500)

@router.get("/getpost/{post_id}")
async def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Posts).filter(Posts.post_id == post_id).first()
    if not post:
        return JSONResponse(content={"message": "Post not found"}, status_code=404)

    # Read the image file
    file_path = f"posts/{post.image_file_name}"
    with open(file_path, "rb") as f:
        file_content = base64.b64encode(f.read()).decode('utf-8')

    return JSONResponse(content={"caption": post.caption, "image": file_content}, status_code=200)

@router.get("/getallposts/{username}")
async def get_all_posts(username: str, db: Session = Depends(get_db)):
    posts = db.query(Posts).filter(Posts.username == username).all()
    post_images = []
    for post in posts:
        with open(f"posts/{post.image_file_name}", "rb") as f:
            image_data = base64.b64encode(f.read()).decode('utf-8')
            post_images.append(image_data)
    return {"post_images": post_images}

@router.post("/loadposts")
async def load_posts(username_request: UsernameRequest, db: Session = Depends(get_db)):
    username = username_request.username
    profile = db.query(Profile).filter(Profile.username == username).first()

    if not profile:
        raise HTTPException(status_code=404, detail="User not found")

    following_users = profile.following

    posts_data = []
    
    # Collect posts from the given username
    user_posts = db.query(Posts).filter(Posts.username == username).all()
    posts_data.extend(user_posts)
    
    # Collect posts from followed users
    for following in following_users:
        posts = db.query(Posts).filter(Posts.username == following).all()
        posts_data.extend(posts)
    
    # Sort posts by post_id in descending order
    posts_data.sort(key=lambda x: x.post_id, reverse=True)

    response_data = []
    for post in posts_data:
        # Fetch post image
        post_image_path = f"posts/{post.image_file_name}"
        with open(post_image_path, "rb") as f:
            post_image_data = base64.b64encode(f.read()).decode('utf-8')

        # Fetch profile image
        following_profile = db.query(Profile).filter(Profile.username == post.username).first()
        profile_image_data = None
        if following_profile and following_profile.profile_picture:
            profile_image_path = f"profile_images/{following_profile.profile_picture}"
            try:
                with open(profile_image_path, "rb") as f:
                    profile_image_data = base64.b64encode(f.read()).decode('utf-8')
            except FileNotFoundError:
                profile_image_data = None

        response_data.append({
            "username": post.username,
            "caption": post.caption,
            "image": post_image_data,
            "profile_image": profile_image_data  # Add profile image to the response
        })

    if not response_data:
        return JSONResponse(content={"message": "No posts found"}, status_code=404)

    return JSONResponse(content=response_data, status_code=200)