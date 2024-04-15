import React, { useState } from 'react';
import './CreateProfile.css';



const CreateProfile = () => {
  const [action, setAction] = useState('Create');
  const [file, setFile] = useState();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
    }
  }

  const handleSubmit = async (event) => {
    // Your existing code for form submission
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
              <img src={file} alt="Preview" />
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
