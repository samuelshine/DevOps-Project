import React, { useState } from 'react';
import './ProfilePage.css';
import ProfileInfo from '../Profile Info/ProfileInfo';
import ProfilePosts from '../Profile Posts/ProfilePosts';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const ProfilePage = () => {
  const { username } = useParams();

  return (
    <div className='ProfilePage'>
      <Sidebar/>
      <div className="profile-container">
        <ProfileInfo username={username} />
        <div className='posts'>
          <ProfilePosts username={username}/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
