import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Search.css';
import Sidebar from '../Sidebar/Sidebar';

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:8000/searchprofile?query=${searchKey}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else if (response.status === 404) {
          setSearchResults([]);
        } else {
          console.error('Failed to fetch search results');
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchKey) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchKey]);

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleProfileClick = (username) => {
    navigate(`/profile/${username}`); // Use navigate to redirect
  };

  return (
    <div className="Explore">
      <Sidebar />
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by username or display name..."
          value={searchKey}
          onChange={handleSearchChange}
        />
        <div className="search-results">
          {searchResults.map((profile, index) => (
            <div
              key={index}
              className="search-result-item"
              onClick={() => handleProfileClick(profile.username)} // Add click handler
            >
              <div className="search-profile-picture">
                <img src={`data:image/jpeg;base64,${profile.profile_picture}`} alt="Profile" />
              </div>
              <div className="search-profile-details">
                <div className="search-display-name">{profile.display_name}</div>
                <div className="search-username">@{profile.username}</div>
              </div>
            </div>
          ))}
          {searchResults.length === 0 && searchKey && (
            <div className="no-results">No profiles found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
