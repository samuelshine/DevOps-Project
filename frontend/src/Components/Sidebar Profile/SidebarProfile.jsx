import React, { useState, useEffect } from 'react';
import './SidebarProfile.css';

const SidebarProfile = ({ username }) => {
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
    return null;
  }

  return (
    <div className="sb-sidebar-profile">
      <div className="sb-profile-picture">
        <img src={`data:image/jpeg;base64,${profileData.profile_picture}`} alt="Profile" />
      </div>
      <div className="sb-profile-details">
        <div className="sb-display-name">{profileData.display_name}</div>
        <div className="sb-username">@{profileData.username}</div>
        <div className="sb-counts">
          <div className="sb-param">
            <strong>{profileData.posts_count}</strong> Posts
          </div>
          <div className="sb-param">
            <strong>{profileData.followers_count}</strong> Followers
          </div>
          <div className="sb-param">
            <strong>{profileData.following_count}</strong> Following
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
