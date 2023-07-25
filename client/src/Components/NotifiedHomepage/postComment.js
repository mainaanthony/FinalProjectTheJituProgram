import React, {useState} from 'react'
import { GoComment } from 'react-icons/go';
import './postComment.css'
import axios from 'axios';

function PostComment({post}) {
    const [comment, setComment] = useState('');
    const [showComment, setShowComment] = useState(false);
 
  const [commentCount, setCommentCount] = useState(post.CommentCount);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
      };
    
      const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const PostId = post.id;
        console.log(comment);
        const data = {
          PostID: PostId,
          CommentText: comment,
        };
        console.log(data);
    
        const response = await axios.post(
          "http://localhost:5051/comments/newComment",
          data,
          {
            withCredentials: true,
          }
        );
        console.log(response);
    
        setComment("");
        setCommentCount(commentCount + 1)
      };
    
      const handleCommentIconClick = () => {
        setShowComment(!showComment);
      };
    
    // const handleCommentChange = (event) => {
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
    





  return (
    <div className='post-stat'>

 <GoComment size={20} onClick={handleCommentIconClick} />
              <p>{post.CommentCount}</p>

              <div className="comment-input-wrapper">
        {showComment && (
          <div className="comment-input-popup">
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={handleCommentChange}
              />
              <button type="submit">Comment</button>
            </form>
          </div>
        )}
      </div>



    </div>
  )
}

export default PostComment