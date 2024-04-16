import React, { useState } from 'react';
import './ProfilePage.css';
import ProfileInfo from '../Profile Info/ProfileInfo';
import ProfilePosts from '../Profile Posts/ProfilePosts';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const ProfilePage = () => {
  const { username } = useParams();

  return (
    <div className="container">
      <div className="profile-info">
        <ProfileInfo username={username} />
      </div>
      <div className='posts'>
        <ProfilePosts username={username}/>
      </div>
    </div>
  );
};

export default ProfilePage;
