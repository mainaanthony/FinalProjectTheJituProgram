import React, { useState } from 'react';
import axios from 'axios';
import { Avatar } from '@mui/material';
//import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import './Search.css';

function Search({onProfileClick}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'posts'

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    try {
      let url;
      if (activeTab === 'users') {
        url = `http://localhost:5051/profile/search/${searchTerm}`;
      } else if (activeTab === 'posts') {
        url = `http://localhost:5051/search/search/${searchTerm}`;
      }

      const response = await axios.get(url, {
        withCredentials: true,
      });
     
      console.log(response)
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  const handleSearchResultClick = (result) => {
    onProfileClick(result); // Call the onProfileClick function passed from Dashboard.jsx
    console.log(result.id)
  };




  return (
    <div className="search-container">
      <div className="search-tabs">
        <div
          className={`search-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => handleTabChange('users')}
        >
          Users
        </div>
        <div
          className={`search-tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => handleTabChange('posts')}
        >
        
        </div>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={`Search ${activeTab}`}
      />

      <ul className="search-results">
        {searchResults.map((result) => (
          <li key={result.UserID} className="search-result"  onClick={() => handleSearchResultClick(result)}>
            <div className="avatar-container">
              <Avatar src={result.ProfilePicture} alt={result.UserName} />
              {/* <VerifiedUserIcon className="verified-icon" /> */}
            </div>
            <span className="username">{result.UserName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
