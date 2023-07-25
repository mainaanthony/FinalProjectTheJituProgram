
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import './Settings.css';
//hellooo
function Settings() {
  const [userName, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [nowPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);









// Function to show the delete confirmation pop-up
const showDeleteConfirmationModal = () => {
  setShowDeleteConfirmation(true);
};

// Function to hide the delete confirmation pop-up
const hideDeleteConfirmationModal = () => {
  setShowDeleteConfirmation(false);
};

// Function to handle the delete account button click
const handleDeleteAccount = () => {
  showDeleteConfirmationModal();
};

// Function to handle the actual account deletion
const handleConfirmDelete = async () => {
  try {
    // Make a DELETE request to the API to delete the account
    await axios.delete('http://localhost:5051/profile/delete', {
      withCredentials: true,
    });

    // Handle any additional actions after successful account deletion, e.g., redirect to login page.
    // For example, you can use React Router to navigate to a different page after successful deletion.

    toast.success('Account deleted successfully');

    // Hide the delete confirmation pop-up after successful deletion
    hideDeleteConfirmationModal();
  } catch (error) {
    console.error('Error deleting account:', error);
  }
};








  
  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    try {
      const response = await axios.get('http://localhost:5051/profile/getUser', {
        withCredentials: true,
      });
      console.log(response)
      const { Username, Bio, profilePicture, gender, country, dateOfBirth } = response.data.results[0];
      setUsername(Username);
      setBio(Bio);
      setProfilePicture(profilePicture);
      setGender(gender);
      setCountry(country);
      setDateOfBirth(dateOfBirth);
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  setSuccessMessage('');
  setErrorMessage('');

  


  try {
    // Make separate API calls for each field update

    // Update Username
    if (userName !== '') {
      const usernameData = {
        userName: userName,
      };
      await axios.put('http://localhost:5051/profile/updateProfile', usernameData, {
        withCredentials: true,
      });
    }

    // Update Bio
    if (bio !== '') {
      const bioData = {
        bio: bio,
      };
      await axios.put('http://localhost:5051/profile/updateProfile', bioData, {
        withCredentials: true,
      });
    }

    // Update Profile Picture
    if (profilePicture) {
      const profilePicData = new FormData();
      profilePicData.append('file', profilePicture);
      profilePicData.append('upload_preset', 'klrwk6mq');
      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/drrjox72d/image/upload',
        profilePicData
      );
      const profilePictureData = {
        profilePicUrl: cloudinaryResponse.data.secure_url,
      };
      await axios.put('http://localhost:5051/profile/updateProfile', profilePictureData, {
        withCredentials: true,
      });
    }

    // Update Gender
    if (gender !== '') {
      const genderData = {
        gender: gender,
      };
      await axios.put('http://localhost:5051/profile/updateProfile', genderData, {
        withCredentials: true,
      });
    }

    // Update Country
    if (country !== '') {
      const countryData = {
        country: country,
      };
      await axios.put('http://localhost:5051/profile/updateProfile', countryData, {
        withCredentials: true,
      });
    }

    // Update Date of Birth
    if (dateOfBirth !== '') {
      const dateOfBirthData = {
        dateOfBirth: dateOfBirth,
      };
      await axios.put('http://localhost:5051/profile/updateProfile', dateOfBirthData, {
        withCredentials: true,
      });
    }

    // If the new password fields are filled, update the password separately
    if (newPassword && confirmPassword) {
      toast.error("Password does not match")
      
      console.log(nowPassword)
      console.log(newPassword)
      console.log(confirmPassword)
      const passwordResponse = await axios.put(`http://localhost:5051/pass/updatePass/${nowPassword}/${newPassword}/${confirmPassword}`,  {
        withCredentials: true,
      });
        
      // Check if the password update was successful
      if (passwordResponse.status === 200) {
        setSuccessMessage('Password updated successfully!');
      } else {
        setErrorMessage('Failed to update password. Please try again.');
      }
    }

    setSuccessMessage('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating user settings:', error);
      setErrorMessage('Failed to update settings. Please try again.');
    }
  };

  return (
    <div className="settings">

      <div className='settings-Top'>
      <h1 className="settings-title">Settings</h1>
      <Button className='deleteAccountBtn'  onClick={handleDeleteAccount }>Delete Account</Button>


       {/* Delete Confirmation Pop-up */}
       {showDeleteConfirmation && (
        <Dialog open={true} onClose={hideDeleteConfirmationModal}>
          <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
          <DialogActions>
            <Button onClick={handleConfirmDelete} color='primary'>
              Yes
            </Button>
            <Button onClick={hideDeleteConfirmationModal} color='primary'>
              No
            </Button>
          </DialogActions>
        </Dialog>
      )}



      </div>
      
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username" className="label">Username:</label>
          <input
            type="text"
            id="username"
            className="input"
            value={userName}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="bio" className="label">Bio:</label>
          <textarea
            id="bio"
            className="input textarea"
            value={bio}
            onChange={handleBioChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="profilePicture" className="label">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            className="input"
            onChange={handleProfilePictureChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="gender" className="label">Gender:</label>
          <select
            id="gender"
            className="input"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="country" className="label">Country:</label>
          <input
            type="text"
            id="country"
            className="input"
            value={country}
            onChange={handleCountryChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="dateOfBirth" className="label">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            className="input"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="currentPassword" className="label">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            className="input"
            value={nowPassword}
            onChange={handleCurrentPasswordChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="newPassword" className="label">New Password:</label>
          <input
            type="password"
            id="newPassword"
            className="input"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="input"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
