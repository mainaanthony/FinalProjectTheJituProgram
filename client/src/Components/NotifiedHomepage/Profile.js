import React, { useState, useEffect, useRef} from 'react';
import './Profile.css';
import { Avatar, Button } from "@mui/material";
import axios from 'axios';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiHome, CiUser, CiSettings } from 'react-icons/ci';
import { CgLivePhoto } from 'react-icons/cg';
import { PiMessengerLogoThin } from 'react-icons/pi';
import { ToastContainer, toast } from 'react-toastify';
import { GoComment } from 'react-icons/go';
import {FiMoreVertical} from 'react-icons/fi'
import FollowingHandler from './followingHandler'
import { FcLikePlaceholder } from 'react-icons/fc';
import FollowersFollowing from './followerFollowingHandler'
import { CiShare2 } from 'react-icons/ci';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';


function Profile({ activeTab , onPostClick}) { // Receive the activeTab prop
  const [userInfo, setUserInfo] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  ///handle posts
  const [posts, setPosts] = useState([]);
  const [followersInfo, setFollowersInfo] = useState([]);
  const [followingInfo, setFollowingInfo] = useState([]);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
///deletion
// State to track the selected post for deletion
const [selectedPost, setSelectedPost] = useState(null);
// State to control whether the modal is open or not
const [isModalOpen, setIsModalOpen] = useState(false);


  
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab); // useState for activeTab

// Function to fetch posts
const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:5051/posts/feed', {
      withCredentials: true,
    });
    setPosts(response.data.result.recordset);
    console.log(response.data.result.recordset);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

useEffect(() => {
  fetchPosts();
}, []);






  //use effect for followers
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get('http://localhost:5051/aboutFollow/followers', {
          withCredentials: true,
        });
        console.log(response.data.data)
        setFollowersInfo(response.data.data);//
         
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, []);


///use effect for following
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get('http://localhost:5051/aboutFollow/following', {
          withCredentials: true,
        });
        console.log(response.data.data)
        setFollowingInfo(response.data.data);//
       
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    };

    fetchFollowing();
  }, []);








  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5051/posts/info', {
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







  useEffect(() => {
    setCurrentActiveTab(activeTab); // Update currentActiveTab whenever activeTab prop changes
  }, [activeTab]);

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






  //handle timestamp


  const formatTimestamp = (timestamp) => {
    const currentTime = new Date();
    const createdTime = new Date(timestamp);
    const timeDifference = Math.abs(currentTime - createdTime);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 1) {
      return 'Just now';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    }
  };
///handle all comments videos and images
const handleCommentChange = (event) => {
  setComment(event.target.value);
};

const handleCommentSubmit = (event) => {
  event.preventDefault();
  console.log(comment);
  setComment('');
};

const handleCommentIconClick = () => {
  setShowComment(!showComment);
};

const handlePlayPause = () => {
  const videoElement = videoRef.current;

  if (videoElement.paused) {
    videoElement.play();
    setIsPlaying(true);
  } else {
    videoElement.pause();
    setIsPlaying(false);
  }
};

const handleVideoHover = () => {
  setIsHovered(!isHovered);
};

const handleSoundToggle = () => {
  setIsMuted(!isMuted);
};

useEffect(() => {
  const videoElement = videoRef.current;

  if (videoElement) {
    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
    };
  }
}, []);

const handleClick = (post) => {
  onPostClick(post);
  console.log("helooo")
};





// Function to handle the confirm delete action
const handleConfirmDelete = () => {
  if (selectedPost) {
    handleDeletePost(selectedPost.id);
    // Close the modal after deleting the post
    setIsModalOpen(false);
    setSelectedPost(null);
  }
};


// Function to handle post deletion
const handleDeletePost = async (id) => {
  try {
   console.log(id)
  //  const data={
  //   postId: id
  //  }

    // Make a DELETE request to the API to delete the post with the given id
    await axios.delete(`http://localhost:5051/new/deletePost/${id}`,
    
    {
      withCredentials: true,
    });
    // Optionally, you can update the posts state to reflect the updated list of posts
    // after successful deletion.
    // For example, you can refetch the posts from the server.
    console.log(id)
    fetchPosts();
    toast.success('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
    toast.error('Error deleting post');
  }
};






  return (
    <div className='profiles'>
      <h1>Profile</h1>
      <div className="profile-header">
        <div >
          <img className="profiles-image" src={userInfo.ProfilePicUrl} alt="Profile" />
           {/* <Avatar className="profile_pic" src={userInfo.profilePic} /> */}
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

      {/* <Button className='editProfile' onClick={handleEditOpen}>
        Edit Profile
      </Button> */}

      {/* Edit Profile Popup */}
      {isEditOpen && (
        <div className="edit-popup">
          <div className="edit-popup-content">
            {/* Rest of the edit profile code */}
          </div>
        </div>
      )}

      <div className="profileTabs">
        <div
          className={`tab ${currentActiveTab === 'posts' ? 'active' : ''}`}
          onClick={() => setCurrentActiveTab('posts')}
        >
          Posts
        </div>
        <div
          className={`tab ${currentActiveTab === 'followers' ? 'active' : ''}`}
          onClick={() => setCurrentActiveTab('followers')}
        >
          Followers
        </div>
        <div
          className={`tab ${currentActiveTab === 'following' ? 'active' : ''}`}
          onClick={() => setCurrentActiveTab('following')}
        >
          Following
        </div>
      </div>

      <div className="profileContent">
        {currentActiveTab === 'posts' && (
          <div className="post-container">
          {posts.map((post) => (
            //  ref={ref}
            <div className="postDetails" key={post.id}  >
              <div className="post-header">

                <div className='first'>

                <div className="profile-image">
                  <img src="https://media3.giphy.com/media/65ATdpi3clAdjomz39/giphy" alt="Profile" />
                </div>
                <div className="post-info"   >
                  <div className="post-info-top">
                    <h3>Marcus Rashford</h3>
                    <p>@m_arcus</p>
                  </div>
                </div>

                </div>
              

                <div className='end'>
                <span> {formatTimestamp(post.created_at)}</span>
          
        </div>


        <div className='dots'
        
        
        onMouseEnter={() => setSelectedPost(post)} // Set the selected post here
        onMouseLeave={() => setSelectedPost(null)}
        >
        <FiMoreVertical   onClick={() => setIsModalOpen(true)} />
       
        {isModalOpen && selectedPost && selectedPost.id === post.id && (
                  <div className="post-details-modal">
                    <div className="post-details-content">
                      {/* Display post content */}
                      <p>{post.postText}</p>

                      {/* Display image or video if available */}
                      {post?.imageUrl && <img src={post.imageUrl} alt="Post" />}
                      {post?.videoUrl && (
                        <video controls>
                          <source src={post.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}

                      {/* Display delete and cancel buttons */}
                      <div className="post-details-footer">
                        <button onClick={() => handleConfirmDelete(post.id)}>Delete Post</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}

        </div>
              </div>

              <div className="post-content"   onClick={() => handleClick(post)} >
                <p>
                 
                  {post.postText}
                </p>




                {/* Rest of the post content */}
                {Object.keys(post).map((key, index) => {
  if (key.startsWith('imageUrl') && post[key]) {
    return <img key={index} src={post[key]} alt={`Image ${index}`} />;
  }
  return null; // If the key is not related to images or imageUrl is falsy, return null to skip it.
})}







                {post?.VideoUrls && post?.VideoUrls?.length > 0 && (
                  <div className="post-videos">
                    {post?.VideoUrls.map((videoUrl, index) => (
                      <div
                        key={index}
                        className="video-wrapper"
                        onMouseEnter={handleVideoHover}
                        onMouseLeave={handleVideoHover}
                      >
                        <video src={videoUrl} ref={videoRef} muted={isMuted} controls />
                        {isHovered && (
                          <div className="video-overlay">
                            {isPlaying ? (
                              <FaPause
                                className="play-pause-icon"
                                onClick={handlePlayPause}
                              />
                            ) : (
                              <FaPlay
                                className="play-pause-icon"
                                onClick={handlePlayPause}
                              />
                            )}
                          </div>
                        )}
                        <div className="mute-button">
                          {isMuted ? (
                            <FaVolumeMute
                              className="volume-icon"
                              onClick={handleSoundToggle}
                            />
                          ) : (
                            <FaVolumeUp
                              className="volume-icon"
                              onClick={handleSoundToggle}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="post-stats">
                <div className="post-stat">
                  <FcLikePlaceholder className='likeHolder' size={20} />
                  <p>20</p>
                </div>
                <div className="post-stat">
                  <GoComment size={20} onClick={handleCommentIconClick} />
                  <p>100</p>
                </div>
                <div className="post-stat">
                  <CiShare2 size={20} />
                  <p>500</p>
                </div>
              </div>
    
              {showComment && (
                <div className="comment-input">
                  <form onSubmit={handleCommentSubmit}>
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={comment}
                      onChange={handleCommentChange}
                    />
                    <button type="submit">Post</button>
                  </form>
                </div>
              )}  

              {/* <div className="post-details-footer">
                    <button onClick={handleConfirmDelete}>Delete Post</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                  </div> */}
            </div>

// crazy


// crazy


          ))}
        </div>
        )}

        {currentActiveTab === 'followers' && (
          <div className="tabContent">




{followersInfo.map((follower) => (
          <FollowersFollowing
            key={follower.FollowerId}
            follower={follower}
            // onClick={() => handlePostClick(post)}
          />
        ))}

          
          
          </div>
        )}

        {currentActiveTab === 'following' && (
          <div className="tabContent">
            {followingInfo.map((following) => (
          <FollowingHandler
            key={following.FollowingId}
            following={following}
            // onClick={() => handlePostClick(post)}
          />
        ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;