import React, { forwardRef, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Post.css'
import { Avatar } from '@mui/material';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiHome, CiUser, CiSettings } from 'react-icons/ci';
import { CgLivePhoto } from 'react-icons/cg';
import { PiMessengerLogoThin } from 'react-icons/pi';
import { ToastContainer, toast } from 'react-toastify';
import { FcLikePlaceholder } from 'react-icons/fc';
import { CiShare2 } from 'react-icons/ci';
import PostComment from './postComment'
import PostLike  from './postLike';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const Post = forwardRef(({ onPostClick }, ref) => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const [isLiked, setIsLiked] = useState(); // Track the like status
  const [likeCount, setLikeCount] = useState(null)
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


  //handle like click
const handleLikeClick = async (post) => {
  const PostId = { PostId: post.id };
  console.log(post)

  try {

    const response = await axios.post(
      `http://localhost:5051/new/postLike`,
      PostId,
      {
        withCredentials: true,
      }
    );

    setIsLiked(!isLiked);
    if(isLiked){
      setLikeCount(likeCount - 1) 
    }else{
      setLikeCount(likeCount + 1) 
    }
    // Toggle the like status
  } catch (error) {
    console.error("Error liking/unliking post:", error);
  }
};


//handle post delete
const handleDeletePost = async (postId) => {
  try {
    // Make a DELETE request to the API
    await axios.delete(`http://localhost:5051/new/deletePost/${postId}`, {
      withCredentials: true,
    });
    // Optionally, you can update the posts state to reflect the updated list of posts
    // after successful deletion.
    // For example, you can refetch the posts from the server.
    fetchPosts();
    toast.success('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
    toast.error('Error deleting post');
  }
};

const handleToggleDeleteOption = () => {
  setShowDeleteOption((prevState) => !prevState);
};






  return (
    <div className="post-container">
      {posts.map((post) => (
        <div className="postDetails" 
        key={post.id} 
        ref={ref}
        onMouseEnter={handleToggleDeleteOption}
        onMouseLeave={handleToggleDeleteOption} >
          <div className="post-header">
            <div className="profile-image">
              <Avatar src={post.ProfilePicUrl}  />
            </div>
            <div className="post-info">
              <div className="post-info-top">
                <h3>{post.UserName[0]}</h3>
                <p>@{post.UserName[1]}</p>
              </div>
            </div>
          </div>
          <div className="post-content" onClick={() => handleClick(post)}>
            <p>
              {/* I am a footballer who currently plays as a forward for Premier League club Manchester United and the England national team. I have been playing for Manchester United since the age of seven. I have been playing for Manchester United since the age of seven. */}
              {post.postText}
            </p>
            {/* Rest of the post content */}
            {Object.keys(post).map((key, index) => {
  if (key.startsWith('imageUrl') && post[key]) {
    return <img key={index} src={post[key]} alt={`Image ${index}`} />;
  }
  return null; // If the key is not related to images or imageUrl is falsy, return null to skip it.
})}

            {/* start of video */}
            {Object.keys(post).map((key, index) => {
  if (key.startsWith('videoUrl') && post[key]) {
    return (
      <div
        key={index}
        className="video-wrapper"
        onMouseEnter={handleVideoHover}
        onMouseLeave={handleVideoHover}
      >
        <video src={post[key]} ref={videoRef} muted={isMuted} controls />
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
    );
  }
  return null; // If the key is not related to videoUrl or videoUrl is falsy, return null to skip it.
})}
           




          </div>


          {/* end of video */}

          <div className="post-stats">
            <div className="post-stat">
              {/* <FcLikePlaceholder 
              className={`like ${isLiked ? "liked" : ""}`} onClick={handleLikeClick} 
              size={20} />
              <p>20</p> */}
               <PostLike post={post} />
              
            </div>
            <div className="post-stat">
              <PostComment  post={post}   />
              
            </div>
            <div className="post-stat">
              <CiShare2 size={20} />
              <p></p>
            </div>
          </div>

          












        </div>
      ))}
    </div>
  );
});

export default Post;
