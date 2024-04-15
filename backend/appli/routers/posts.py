from fastapi import APIRouter, File, UploadFile, Form, Depends
from fastapi.responses import JSONResponse
from pathlib import Path
from . import get_db
from sqlalchemy.orm import Session
from .tables import Posts

router = APIRouter()

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
        db.commit()
        
        return JSONResponse(content={"message": "Post created successfully"})
    except Exception as e:
        print(e)
        return JSONResponse(content={"message": f"Failed to create post: {e}"}, status_code=500)
