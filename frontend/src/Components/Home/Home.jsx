import React, { useEffect } from 'react';
import './Home.css';
import Sidebar from '../Sidebar/Sidebar';
import PostCards from '../PostCards/PostCards';

function Home() {
  useEffect(() => {
    // Add class to body
    document.body.classList.add('home-body');
    console.log("Done")
    // Cleanup function to remove class when the component unmounts
    return () => {
      console.log("Done")
      document.body.classList.remove('home-body');
    };
  }, []);

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
