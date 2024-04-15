import React, { useState, useEffect } from 'react';
import './ProfilePosts.css';

const ProfilePosts = ({ username }) => {
  const [postImages, setPostImages] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getallposts/${username}`);
        if (response.ok) {
          const data = await response.json();
          setPostImages(data.post_images);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [username]);

  if (!postImages) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-posts">
      {postImages.map((image, index) => (
        <div className="post" key={index}>
          <img src={`data:image/jpeg;base64,${image}`} alt={`Post ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
