import React, { useState } from 'react';
import axios from 'axios';
import { FcLikePlaceholder } from 'react-icons/fc';
import './replyLike.css'

function ReplyLike({reply}) {

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(reply.LikeCount);
  

    const handleLikeClick = async () => {
        const PostID = { PostID: reply.id };
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
    <div>R</div>
  )
}

export default ReplyLike