import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='container'>
        <div className="header">
            <h1>Instagram</h1>
        </div>
        <div className="menu-items">
            <div className="home">Home</div>
            <div className="explore">Explore</div>
            <div className="messages">Messages</div>
            <div className="likes">Likes</div>
            <div className="create">Create</div>
            <div className="profile">Profile</div>
        </div>
    </div>
  )
}

export default Sidebar