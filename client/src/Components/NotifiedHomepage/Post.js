// import React from 'react'
// import {Avatar} from "@mui/material"

// function Post({
//     displayName,
//     userName,
//     verified,
//     text,
//     image,
//     video,
//     like,
//     Count,
//     avatar

// }) {
   



//   return (
//     <div className='post'>
//         <div className='post_avatar'>
//             <Avatar></Avatar>

//         </div>
//         <div className='post_body'>
//            <div className='post_header'>
//                <div className='post_headerText'>
//              <h3>
//                 Rafeh Qazi{""}
//                 <span>
//                     <h1>g</h1>
//                 </span>
//              </h3>
//                </div>
//             <div  className='post_headerDescription'>
//                 <p>I challenge you to a fight</p>
//             </div>
//          <img src='https://media3.giphy.com/media/65ATdpi3clAdjomz39/giphy'/>

//            </div>
           
//         </div>
      
//     </div>
//   )
// }

// export default Post


////second


// import React,{forwardRef, useState} from 'react'
// import './Post.css'
// import {Avatar} from "@mui/material"
// import { IoMdNotificationsOutline } from 'react-icons/io';
// import { CiHome, CiUser, CiSettings } from 'react-icons/ci';
// import { CgLivePhoto } from 'react-icons/cg';
// import { PiMessengerLogoThin } from 'react-icons/pi';
// import { GoComment } from 'react-icons/go';
// import { FcLikePlaceholder } from 'react-icons/fc'
// import { CiShare2 } from 'react-icons/ci';

// function Post({post

// }, ref) {
   

// const [comment, setComment] = useState("")
// const [showComment, setShowComment] = useState(false)


// const handleCommentChange = (event) => {
//     setComment(event.target.value);
//   };


// const handleCommentSubmit = (event) =>{
//     event.preventDefault();
//     console.log(comment)
//     setComment("")
// }


// const handleCommentIconClick = () => {
//     setShowComment(!showComment);
//   };









  
//   return (
//     <div className='post-container' >
//          <div className='post-header'>
//               <div className='profile-image'>
//               <img src='https://media3.giphy.com/media/65ATdpi3clAdjomz39/giphy'/>
//               {/* replace src with the following  <Avatar src={post.ProfilePicture} />  same case goes for the content etc*/  }
//               </div>
//               <div className='post-info'>
//                 <div className='post-info-top'>
//                   <h3>Marcus Rashford</h3>
//                   <p>@m_arcus</p>
//                 </div>
//                 {/* <div className='post-info-bottom'>
//                   <p>2h</p>
//                   <p>Public</p>
//                   <p>...</p>
//                 </div> */}
//               </div>
//             </div>
//             <div className='post-content'>
//               <p>
//                 I am a footballer who currently plays as a forward for Premier League club Manchester United and the England national team. I have been playing for Manchester United since the age of seven. I have been playing for Manchester United since the age of seven.
//               </p>
//              <img src='https://media3.giphy.com/media/65ATdpi3clAdjomz39/giphy'/>
//             </div>
//             <div className='post-stats'>
//               <div className='post-stat'>
//                 <FcLikePlaceholder size={20} />
//                 <p>20</p>
//               </div>
//               <div className='post-stat'>
//                 <GoComment size={20} />
//                 <p>100</p>
//               </div>
//               <div className='post-stat'>
//                 <CiShare2 size={20} />
//                 <p>500</p>
//               </div>
//             </div>
      
//     </div>
//   )
// }

// export default Post


// second

// import React, { forwardRef, useState, useEffect, useRef } from 'react';
// import './Post.css';
// import { Avatar } from '@mui/material';
// import { IoMdNotificationsOutline } from 'react-icons/io';
// import { CiHome, CiUser, CiSettings } from 'react-icons/ci';
// import { CgLivePhoto } from 'react-icons/cg';
// import { PiMessengerLogoThin } from 'react-icons/pi';
// import { GoComment } from 'react-icons/go';
// import { FcLikePlaceholder } from 'react-icons/fc';
// import { CiShare2 } from 'react-icons/ci';
// import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

// const Post = forwardRef(({ post ,  onPostClick}, ref) => {




//   const [comment, setComment] = useState('');
//   const [showComment, setShowComment] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const videoRef = useRef(null);


//   const imageUrls = post?.ImageUrls?.split(",") || [];
//   const videoUrls = post?.VideoUrls?.split(",") || [];

//   const handleCommentChange = (event) => {
//     setComment(event.target.value);
//   };

//   const handleCommentSubmit = (event) => {
//     event.preventDefault();
//     console.log(comment);
//     setComment('');
//   };

//   const handleCommentIconClick = () => {
//     setShowComment(!showComment);
//   };

//   const handlePlayPause = () => {
//     const videoElement = videoRef.current;

//     if (videoElement.paused) {
//       videoElement.play();
//       setIsPlaying(true);
//     } else {
//       videoElement.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleVideoHover = () => {
//     setIsHovered(!isHovered);
//   };

//   const handleSoundToggle = () => {
//     setIsMuted(!isMuted);
//   };

//   useEffect(() => {
//     const videoElement = videoRef.current;

//     if (videoElement) {
//       const handlePlay = () => {
//         setIsPlaying(true);
//       };

//       const handlePause = () => {
//         setIsPlaying(false);
//       };

//       videoElement.addEventListener('play', handlePlay);
//       videoElement.addEventListener('pause', handlePause);

//       return () => {
//         videoElement.removeEventListener('play', handlePlay);
//         videoElement.removeEventListener('pause', handlePause);
//       };
//     }
//   }, []);




//   const handleClick = () => {
//     onPostClick(post); // Call onPostClick when the post is clicked
//   };




//   return (
//     <div className="post-container" >




//       <div className='postDetails' ref={ref}  onClick={handleClick}>
//       <div className="post-header">
//         <div className="profile-image">
//           <img src="https://media3.giphy.com/media/65ATdpi3clAdjomz39/giphy" alt="Profile" />
//         </div>
//         <div className="post-info">
//           <div className="post-info-top">
//             <h3>Marcus Rashford</h3>
//             <p>@m_arcus</p>
//           </div>
//         </div>
//       </div>
//       <div className="post-content">
//         <p>
//           I am a footballer who currently plays as a forward for Premier League club Manchester United and the England national team. I have been playing for Manchester United since the age of seven. I have been playing for Manchester United since the age of seven.
//         </p>
//         {post?.ImageUrls && post?.ImageUrls?.length > 0 && (
//           <div className="post-images">
//             {post?.ImageUrl?.map((imageUrl, index) => (
//               <img key={index} src={imageUrl} alt={`Image ${index}`} />
//             ))}
//           </div>
//         )}
//         {post?.VideoUrl && post?.VideoUrls?.length > 0 && (
//           <div className="post-videos">
//             {post?.VideoUrls.map((videoUrl, index) => (
//               <div
//                 key={index}
//                 className="video-wrapper"
//                 onMouseEnter={handleVideoHover}
//                 onMouseLeave={handleVideoHover}
//               >
//                 <video src={videoUrl} ref={videoRef} muted={isMuted} controls />
//                 {isHovered && (
//                   <div className="video-overlay">
//                     {isPlaying ? (
//                       <FaPause
//                         className="play-pause-icon"
//                         onClick={handlePlayPause}
//                       />
//                     ) : (
//                       <FaPlay
//                         className="play-pause-icon"
//                         onClick={handlePlayPause}
//                       />
//                     )}
//                   </div>
//                 )}
//                 <div className="mute-button">
//                   {isMuted ? (
//                     <FaVolumeMute
//                       className="volume-icon"
//                       onClick={handleSoundToggle}
//                     />
//                   ) : (
//                     <FaVolumeUp
//                       className="volume-icon"
//                       onClick={handleSoundToggle}
//                     />
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

    
      
//       <div className="post-stats">
//         <div className="post-stat">
//           <FcLikePlaceholder size={20} />
//           <p>20</p>
//         </div>


        


//         <div className="post-stat">
//           <GoComment size={20}  onClick={handleCommentIconClick}/>
//           <p>100</p>
//         </div>
//         <div className="post-stat">
//           <CiShare2 size={20} />
//           <p>500</p>
//         </div>
//       </div>



//   {/* crazy */}

//   {showComment && (
//         <div className="comment-input">
//           <form onSubmit={handleCommentSubmit}>
//             <input
//               type="text"
//               placeholder="Write a comment..."
//               value={comment}
//               onChange={handleCommentChange}
//             />
//             <button type="submit">Post</button>
//           </form>
//         </div>
//       )}

//       </div>
//     {/* crazy */}

//     </div>
//   );
// });

// export default Post;



// second


import React, { forwardRef, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Post.css'
import { Avatar } from '@mui/material';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiHome, CiUser, CiSettings } from 'react-icons/ci';
import { CgLivePhoto } from 'react-icons/cg';
import { PiMessengerLogoThin } from 'react-icons/pi';
import { GoComment } from 'react-icons/go';
import { FcLikePlaceholder } from 'react-icons/fc';
import { CiShare2 } from 'react-icons/ci';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const Post = forwardRef(({ onPostClick }, ref) => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5050/posts/feed', {
          withCredentials: true,
        });
        setPosts(response.data.result.recordset);//
        // console.log(response.data.result.recordset)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

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
    <div className="post-container">
      {posts.map((post) => (
        <div className="postDetails" key={post.id} ref={ref} onClick={() => handleClick(post)}>
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
  );
});

export default Post;
