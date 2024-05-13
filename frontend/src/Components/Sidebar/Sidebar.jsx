import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import SidebarProfile from '../Sidebar Profile/SidebarProfile'; // Import the SidebarProfile component

const Sidebar = () => {
  let navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve the username from storage

  const createNewPost = () => {
    navigate('/create/post');
  };

  const logout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  const goToProfile = () => {
    const username = localStorage.getItem('username');
    navigate(`/profile/${username}`);
  };

  return (
    <div className='sidebar-container'>
      <SidebarProfile username={username} />
      <div className="sidebar-header">
        <h1>Instagram</h1>
      </div>
      <div className="menu-items">
        <div className="home">Home</div>
        <div className="explore">Explore</div>
        <div className="messages">Messages</div>
        <div className="likes">Likes</div>
        <div className="create" onClick={createNewPost}>Create</div>
        <div className="profile" onClick={goToProfile}>Profile</div>
        <div className="logout" onClick={logout}>Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
