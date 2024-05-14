import React, { useState, useEffect } from 'react';
import './PostCards.css'; // You can create this CSS file to style the cards

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="user-info">
        <img src={`data:image/jpeg;base64,${post.profile_image}`} alt="profile" className="profile-image" />
        <h3>{post.username}</h3>
      </div>
      <img src={`data:image/jpeg;base64,${post.image}`} alt="post" className="post-image" />
      <p>{post.caption}</p>
    </div>
  );
};

const PostCards = () => {
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://0.0.0.0:8000/loadposts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (username) {
      fetchPosts();
    }
  }, [username]);

  if (!posts || !Array.isArray(posts)) {
    return null; // or render a loading indicator
  }

  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
};

export default PostCards;
