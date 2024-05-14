import React from 'react';
import './Home.css';
import Sidebar from '../Sidebar/Sidebar';
import PostCards from '../PostCards/PostCards';

function Home() {
  return (
    <div className="Home">
      <Sidebar/>
      <PostCards/>
    </div>
  );
}

export default Home;
