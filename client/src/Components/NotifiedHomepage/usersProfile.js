import React, { useState, useEffect, useRef} from 'react';
import './Profile.css';
import { Avatar, Button } from "@mui/material";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiHome, CiUser, CiSettings } from 'react-icons/ci';
import { CgLivePhoto } from 'react-icons/cg';
import { PiMessengerLogoThin } from 'react-icons/pi';
import { ToastContainer, toast } from 'react-toastify';
import { GoComment } from 'react-icons/go';
import FollowingHandler from './followingHandler'
import { FcLikePlaceholder } from 'react-icons/fc';
import FollowersFollowing from './followerFollowingHandler'
import { CiShare2 } from 'react-icons/ci';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';


function Profile({ activeTab , onPostClick, id }) { // Receive the activeTab prop
  const { UserId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
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


   console.log(id) 
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab); // useState for activeTab

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5051/pass/feedSpecific/${id}`, {
          withCredentials: true,
        });
        setPosts(response.data.result.recordset);//
         console.log(response.data.result.recordset)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

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
        const response = await axios.get(`http://localhost:5051/pass/feedSpecificInfo/${id}`, {
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
            <div className="postDetails" key={post.id} onClick={() => handleClick(post)}>
              <div className="post-header">
                <div className="profile-image">
                  <img src="https://media3.giphy.com/media/65ATdpi3clAdjomz39/giphy" alt="Profile" />
                </div>
                <div className="post-info">
                  <div className="post-info-top">
                    <h3>Marcus Rashford</h3>
                    <p>@m_arcus</p>
                  </div>
                </div>
              </div>
              <div className="post-content">
                <p>
                  I am a footballer who currently plays as a forward for Premier League club Manchester United and the England national team. I have been playing for Manchester United since the age of seven. I have been playing for Manchester United since the age of seven.
                  {post.postText}
                </p>
                {/* Rest of the post content */}
                {post?.ImageUrls && post?.ImageUrls?.length > 0 && (
                  <div className="post-images">
                    {post?.ImageUrls.map((imageUrl, index) => (
                      <img key={index} src={imageUrl} alt={`Image ${index}`} />
                    ))}
                  </div>
                )}
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
            </div>
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