import React from 'react';
import './Home.css';
import Sidebar from '../Sidebar/Sidebar';
import PostCards from '../PostCards/PostCards';

function Home() {
  return (
    <div className="Home">
      <Sidebar />
      <div className="content">
        <h2 className='home-title'>Latest Feed</h2>
        <PostCards />
      </div>
    </div>
  );
}

export default Home;
