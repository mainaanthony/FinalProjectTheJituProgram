import React, { useState } from 'react';
import axios from 'axios';
import { FcLikePlaceholder } from 'react-icons/fc';
import './commentLike.css'

function CommentLike({ comment }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(comment.LikeCount);
  

    const handleLikeClick = async () => {
        const PostID = { PostID: comment.id };
        const LikedObjectType = { LikedObjectType: 'Post' }; // Add this line to specify the LikedObjectType
        console.log(PostID)
    
        try {
    
          const response = await axios.post(
            `http://localhost:5050/new/postLike`,
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
          console.error("Error liking/unliking comment:", error);
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
  )
}

export default CommentLike