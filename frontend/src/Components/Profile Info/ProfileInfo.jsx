import React, { useState, useEffect } from 'react';
import './ProfileInfo.css';

const ProfileInfo = ({ username }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://0.0.0.0:8000/getprofile/${username}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [username]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-info">
      <div className="profile-picture">
        <img src={`data:image/jpeg;base64,${profileData.profile_picture}`} alt="Profile" />
      </div>
      <div className="profile-details">
        <div className='username'>{profileData.username}</div>
        <div className='counts'>
            <label className='param'><strong>{profileData.posts_count}</strong> posts</label>
            <label className='param'><strong>{profileData.followers_count}</strong> followers</label>
            <label className='param'><strong>{profileData.following_count}</strong> following</label>
        </div>
        <div><strong>{profileData.display_name}</strong><br />{profileData.bio}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
