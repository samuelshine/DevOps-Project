import React, { useState, useEffect } from 'react';
import './ProfileInfo.css';

const ProfileInfo = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [buttonText, setButtonText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://0.0.0.0:8000/getprofile/${username}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Profile data:', data);
          setProfileData(data);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [username]);

  useEffect(() => {
    const checkFollowing = async () => {
        try {
            const response = await fetch(`http://0.0.0.0:8000/isfollowing?follower=${localStorage.getItem('username')}&following=${profileData.username}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you have a token stored in localStorage
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Is following:', data);

                if (profileData.username === localStorage.getItem('username')) {
                    setButtonText('Edit Profile');
                } else {
                    if (data.is_following) {
                        setButtonText('Unfollow');
                    } else {
                        setButtonText('Follow');
                    }
                }
            } else {
                console.error('Failed to check following status');
            }
        } catch (error) {
            console.error('Error checking following status:', error);
        }
    };

    if (profileData) {
        checkFollowing();
    }
}, [profileData]);


  const handleButtonClick = async () => {
    const follower = localStorage.getItem('username')
    const following = profileData.username
    try {
      if (buttonText === 'Follow') {
        const response = await fetch('http://0.0.0.0:8000/follow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            follower,
            following,
          }),
        });
  
        if (response.ok) {
          // If the request was successful, refresh the page
          window.location.reload();
        } else {
          console.error('Failed to follow user');
        }
      } else if (buttonText === 'Unfollow') {
        const response = await fetch('http://0.0.0.0:8000/unfollow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            follower,
            following,
          }),
        });
  
        if (response.ok) {
          // If the request was successful, refresh the page
          window.location.reload();
        } else {
          console.error('Failed to unfollow user');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  if (isLoading) {
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
        <button onClick={handleButtonClick}>{buttonText}</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
