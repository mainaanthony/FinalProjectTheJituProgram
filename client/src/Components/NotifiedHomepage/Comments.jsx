import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Comments.css'
import SingleComment from './singleComment'

function Comments({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5051/new/comments/${post.id}`, {
          withCredentials: true,
        });
        setComments(response.data.results);//
       
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);


  return (
    <div className='commentsFeed'>
      
     

      {/* Display comments */}
      <h4>Comments:</h4>
      
      {comments.map((comment) => (
        <SingleComment key={comment.id} comment={comment} />
        
      ))}
    
    </div>
  );
}

export default Comments;
