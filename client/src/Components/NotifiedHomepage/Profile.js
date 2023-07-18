
import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Avatar, Button } from "@mui/material";
import axios from 'axios';

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5050/posts/info', {
          withCredentials: true
        });
        setUserInfo(response.data.result);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSaveChanges = () => {
    // Handle save changes logic here
    // Access the selected image using selectedImage state
    // Access other form inputs using their respective states (bio, address, country, gender)
  };

  return (
    <div className='profiles'>
      <h1>Profile</h1>
      <div className="profile-header">
        <div className="profiles-image">
          <img src={userInfo.ProfilePicUrl} alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="profile-info-top">
            <h3>{userInfo.Name}</h3>
            <p>@{userInfo.userName}</p>
          </div>
        </div>
      </div>

      <div className='bio'>{userInfo.Bio}</div>
      <div className="profileFollowDetails">
        <div className="details">
          <div className="nameDits">Posts</div>
          <div className="numberDits">{userInfo.TotalPosts}</div>
        </div>

        <div className="details">
          <div className="nameDits">Followers</div>
          <div className="numberDits">{userInfo.Followers}</div>
        </div>

        <div className="details">
          <div className="nameDits">Following</div>
          <div className="numberDits">{userInfo.Following}</div>
        </div>
      </div>

      <Button onClick={handleEditOpen}>
        Edit Profile
      </Button>

      {/* Edit Profile Popup */}
      {isEditOpen && (
        <div className="edit-popup">
          <div className="edit-popup-content">
            <div className="edit-image-container">
              <div className="current-profile-image">
                <img
                  src={userInfo.ProfilePicUrl}
                  alt="Current Profile"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                id="profile-image-upload"
                style={{ display: 'none' }}
                onChange={handleImageSelect}
              />
              <label htmlFor="profile-image-upload" className="upload-icon">
                <img
                  src="path_to_icon_image"
                  alt="Select Profile Image"
                  style={{ cursor: 'pointer' }}
                />
              </label>
            </div>
            <div className="edit-form-container">
              <input
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <div className="edit-button-container">
                <Button onClick={handleSaveChanges}>Save</Button>
                <Button onClick={handleEditClose}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="profileTabs">
        <div className="tab">Posts</div>
        <div className="tab">Followers</div>
        <div className="tab">Following</div>
      </div>

      <div className='profileContent'>
        {/* Display posts, followers, following content here */}
        {/* Posts */}
        <div className="tabContent">
          <h2>Posts</h2>
          {/* Dummy data for posts */}
          {/* {userInfo.PostIDs && userInfo.PostIDs.map(postId => (
            <div className="postProfile" key={postId}>
              <Avatar />
              <div className="postInfo">
                <h4>Post Title</h4>
                <p>Post Description</p>
              </div>
            </div>
          ))} */}
        </div>

        {/* Followers */}
        <div className="tabContent">
          <h2>Followers</h2>
          {/* Dummy data for followers */}
          {/* {userInfo.FollowersList && userInfo.FollowersList.map(follower => (
            <div className="followerProfile" key={follower}>
              <Avatar />
              <div className="followerInfo">
                <h4>Follower Name</h4>
                <p>@{follower}</p>
                <Button>Follow</Button>
              </div>
            </div>
          ))} */}
        </div>

        {/* Following */}
        <div className="tabContent">
          <h2>Following</h2>
          {/* Dummy data for following */}
          {/* {userInfo.FollowingList && userInfo.FollowingList.map(following => (
            <div className="followingProfile" key={following}>
              <Avatar />
              <div className="followingInfo">
                <h4>Following Name</h4>
                <p>@{following}</p>
                <Button>Unfollow</Button>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Profile;



// import React, { useState } from 'react';
// import './Profile.css';
// import { Avatar, Button } from "@mui/material";

// function Profile() {
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [bio, setBio] = useState('');
//   const [address, setAddress] = useState('');
//   const [country, setCountry] = useState('');
//   const [gender, setGender] = useState('');

//   const handleEditOpen = () => {
//     setIsEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setIsEditOpen(false);
//   };

//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleSaveChanges = () => {
//     // Handle save changes logic here
//     // Access the selected image using selectedImage state
//     // Access other form inputs using their respective states (bio, address, country, gender)
//   };

//   return (
//     <div className='profiles'>
//       <h1>Profile</h1>
//       <div className="profile-header">
//         <div className="profiles-image">
//           <img src="https://media3.giphy.com/media/65ATdpi3clAdjomz39/giphy" alt="Profile" />
//         </div>
//         <div className="profile-info">
//           <div className="profile-info-top">
//             <h3>Marcus Rashford</h3>
//             <p>@m_arcus</p>
//           </div>
//         </div>
//       </div>

//      <div className='bio'> Helloooo I am a software developer with 10 years experience</div>
//       <div className="profileFollowDetails">
//         <div className="details">
//           <div className="nameDits">Posts</div>
//           <div className="numberDits">100</div>
//         </div>

//         <div className="details">
//           <div className="nameDits">Followers</div>
//           <div className="numberDits">100</div>
//         </div>

//         <div className="details">
//           <div className="nameDits">Following</div>
//           <div className="numberDits">100</div>
//         </div>
//       </div>

//       <Button onClick={handleEditOpen}>
//         Edit Profile
//       </Button>

//       {/* Edit Profile Popup */}
//       {isEditOpen && (
//         <div className="edit-popup">
//           <div className="edit-popup-content">
//             <div className="edit-image-container">
//               <div className="current-profile-image">
//                 <img
//                   src="https://media3.giphy.com/media/65ATdpi3clAdjomz39/giphy"
//                   alt="Current Profile"
//                 />
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="profile-image-upload"
//                 style={{ display: 'none' }}
//                 onChange={handleImageSelect}
//               />
//               <label htmlFor="profile-image-upload" className="upload-icon">
//                 <img
//                   src="path_to_icon_image"
//                   alt="Select Profile Image"
//                   style={{ cursor: 'pointer' }}
//                 />
//               </label>
//             </div>
//             <div className="edit-form-container">
//               <input
//                 type="text"
//                 placeholder="Bio"
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Country"
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Gender"
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//               />
//               <div className="edit-button-container">
//                 <Button onClick={handleSaveChanges}>Save</Button>
//                 <Button onClick={handleEditClose}>Cancel</Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="profileTabs">
//         <div className="tab">Posts</div>
//         <div className="tab">Followers</div>
//         <div className="tab">Following</div>
//       </div>

//       <div className='profileContent'>
//         {/* Display posts, followers, following content here */}
//         {/* Posts */}
//         <div className="tabContent">
//           <h2>Posts</h2>
//           {/* Dummy data for posts */}
//           <div className="postProfile">
//             <Avatar />
//             <div className="postInfo">
//               <h4>Post Title</h4>
//               <p>Post Description</p>
//             </div>
//           </div>
//           <div className="postProfile">
//             <Avatar />
//             <div className="postInfo">
//               <h4>Post Title</h4>
//               <p>Post Description</p>
//             </div>
//           </div>
//           <div className="postProfile">
//             <Avatar />
//             <div className="postInfo">
//               <h4>Post Title</h4>
//               <p>Post Description</p>
//             </div>
//           </div>
//         </div>

//         {/* Followers */}
//         <div className="tabContent">
//           <h2>Followers</h2>
//           {/* Dummy data for followers */}
//           <div className="followerProfile">
//             <Avatar />
//             <div className="followerInfo">
//               <h4>Follower Name</h4>
//               <p>@follower_username</p>
//               <Button>Follow</Button>
//             </div>
//           </div>
//           <div className="followerProfile">
//             <Avatar />
//             <div className="followerInfo">
//               <h4>Follower Name</h4>
//               <p>@follower_username</p>
//               <Button>Follow</Button>
//             </div>
//           </div>
//           <div className="followerProfile">
//             <Avatar />
//             <div className="followerInfo">
//               <h4>Follower Name</h4>
//               <p>@follower_username</p>
//               <Button>Follow</Button>
//             </div>
//           </div>
//         </div>

//         {/* Following */}
//         <div className="tabContent">
//           <h2>Following</h2>
//           {/* Dummy data for following */}
//           <div className="followingProfile">
//             <Avatar />
//             <div className="followingInfo">
//               <h4>Following Name</h4>
//               <p>@following_username</p>
//               <Button>Unfollow</Button>
//             </div>
//           </div>
//           <div className="followingProfile">
//             <Avatar />
//             <div className="followingInfo">
//               <h4>Following Name</h4>
//               <p>@following_username</p>
//               <Button>Unfollow</Button>
//             </div>
//           </div>
//           <div className="followingProfile">
//             <Avatar />
//             <div className="followingInfo">
//               <h4>Following Name</h4>
//               <p>@following_username</p>
//               <Button>Unfollow</Button>
//             </div>
//           </div>
//         </div>
//       </div>

     
//     </div>
//   );
// }

// export default Profile;




