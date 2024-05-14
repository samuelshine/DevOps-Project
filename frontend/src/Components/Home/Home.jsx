import React from 'react';
import './Home.css';
import Sidebar from '../Sidebar/Sidebar';
import PostCards from '../PostCards/PostCards';

const images = [
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300'
];

function Home() {
  return (
    <div className="Home">
      <PostCards/>
    </div>
  );
}

export default Home;
