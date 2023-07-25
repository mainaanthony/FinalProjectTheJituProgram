import React, { useState } from 'react';
import axios from 'axios';
import { FcLikePlaceholder } from 'react-icons/fc';
import './postLike.css'

const PostLike = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.LikeCount);

//   const handleLikeClick = async () => {
//     const LikedObjectID = { PostId: post.id };
//     const LikedObjectType = { LikedObjectType: 'Post' }; // Add this line to specify the LikedObjectType

//     try {
//       const response = await axios.post(
//         `http://localhost:5050/new/postLike`,
//         { ...LikedObjectID, ...LikedObjectType }, // Combine both objects in the request
//         {
//           withCredentials: true,
//         }
//       );

//       setIsLiked(!isLiked);
//       setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
//     } catch (error) {
//       console.error("Error liking/unliking post:", error);
//     }
//   };


  const handleLikeClick = async () => {
    const PostID = { PostID: post.id };
    const LikedObjectType = { LikedObjectType: 'Post' }; // Add this line to specify the LikedObjectType
    console.log(PostID)

    try {

      const response = await axios.post(
        `http://localhost:5051/new/postLike`,
        { ...PostID, ...LikedObjectType }, // Combine both objects in the request
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






  return (
    <div className="post-stat">
      <FcLikePlaceholder
        className={`like ${isLiked ? "liked" : ""}`}
        onClick={handleLikeClick}
        size={{likeCount}}
      />
      <p>{likeCount}</p>
    </div>
  );
};

export default PostLike;
