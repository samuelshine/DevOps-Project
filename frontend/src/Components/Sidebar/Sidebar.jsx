import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import SidebarProfile from '../Sidebar Profile/SidebarProfile'; // Import the SidebarProfile component
import { FaHome, FaCompass, FaPlusSquare, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const Sidebar = () => {
  let navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve the username from storage

  const goHome = () => {
    navigate('/home');
  };
  
  const goExplore = () => {
    navigate('/explore');
  };

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
      <div className="menu-section">
        <div className="menu-items">
          <div className="menu-item" onClick={goHome}><FaHome className="icon" /> Home</div>
          <div className="menu-item" onClick={goExplore}><FaCompass className="icon" /> Explore</div>
          <div className="menu-item" onClick={createNewPost}><FaPlusSquare className="icon" /> Create</div>
          <div className="menu-item" onClick={goToProfile}><FaUser className="icon" /> Profile</div>
        </div>
      </div>
      <div className="menu-item logout" onClick={logout}><FaSignOutAlt className="icon" /> Logout</div>
    </div>
  );
};

export default Sidebar;
