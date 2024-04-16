import React, { useState } from 'react';
import './CreateProfile.css';
import { useNavigate } from 'react-router-dom';

const CreateProfile = () => {
  const [action, setAction] = useState('Create');
  const [file, setFile] = useState(null); // Store the file object instead of URL
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Store the file object
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('display_name', displayName);
    formData.append('bio', bio);

    // Assuming you have the username stored in localStorage
    const username = localStorage.getItem('username');
    formData.append('username', username);

    try {
      const response = await fetch('http://0.0.0.0:8000/createprofile', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        console.log('Profile created successfully');
        navigate(`/profile/${username}`);
      } else {
        console.error('Failed to create profile');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Create Profile</h1>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <input type='text' placeholder='Display Name' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>
          <div className="input">
            <input type='text' placeholder='Tell us a little about yourself' value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div className="input">
            <input
              type="file"
              placeholder="Upload your image"
              className='image'
              onChange={handleChange}
              accept="image/*"
              name="image"
            />
          </div>
          {file && (
            <div className='image-preview'>
              <img src={URL.createObjectURL(file)} alt="Preview" />
            </div>
          )}
        </div>
        <div className="btn">
          <button type='submit'>{action}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
