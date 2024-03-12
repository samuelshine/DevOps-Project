import React from 'react';
import './Home.css';
import Sidebar from '../Sidebar/Sidebar';

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
      <Sidebar/>
      <div className="grid-container">
        {images.map((image, index) => (
          <div className="grid-item" key={index}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
