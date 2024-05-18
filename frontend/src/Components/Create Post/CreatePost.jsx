import React, { useState } from 'react';
import './CreatePost.css';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [action, setAction] = useState('Create');
  const [file, setFile] = useState();
  const navigate = useNavigate();
  
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const formData = new FormData();
      formData.append('file', event.target.image.files[0]);
      formData.append('caption', event.target.caption.value);
      
      // Get username from local storage
      const username = localStorage.getItem('username');
      formData.append('username', username);
    
      try {
        const response = await fetch('http://0.0.0.0:8000/createpost', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          console.log('Post created successfully');
          navigate('/home');
        } else {
          console.error('Failed to create post');
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    };
    
    
  
      

  return (
    <div className='CreatePost'>
      <Sidebar/>
      <div className="cp-container">
        <div className="header">
          <h1>Create Post</h1>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="file"
              placeholder="Upload your image"
              className='image'
              onChange={handleChange}
              accept="image/*"
              name="image"
            />
            <input type='text' placeholder='Caption' name='caption' />
          </div>
          <div className='image-preview'>
              <img src={file} />
          </div>
          
          <div className="submit-container">
            <button type='submit'>{action}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;