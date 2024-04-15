import React from 'react';
import './Sidebar.css';

import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  let navigate = useNavigate(); 

  const createNewPost = () => {
    navigate('/create/post');
  };

  return (
    <div className='sidebar-container'>
        <div className="sidebar-header">
            <h1>Instagram</h1>
        </div>
        <div className="menu-items">
            <div className="home">Home</div>
            <div className="explore">Explore</div>
            <div className="messages">Messages</div>
            <div className="likes">Likes</div>
            <div className="create" onClick={createNewPost}>Create</div>
            <div className="profile">Profile</div>
        </div>
    </div>
  )
}

export default Sidebar;