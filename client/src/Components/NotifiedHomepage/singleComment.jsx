import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Avatar } from '@mui/material';
import {FcLikePlaceholder} from 'react-icons/fc';
import{MdVerified} from  'react-icons/md';
import {BsReply}  from 'react-icons/bs';
import './Comments.css';

function Comment({ comment }) {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyCommentId, setReplyCommentId] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [replies, setReplies] = useState({});
    const [showReplies, setShowReplies] = useState(false);
    const [replyCount, setReplyCount] = useState(comment.ReplyCount);
    const [likeCount, setLikeCount] = useState(comment.LikeCount);
    const [liked, setLiked] = useState(false);
  
  const handleLikeClick = async (comment) => {
    try {
      const response = await axios.post(
        `http://localhost:5051/likeComment`,
        { CommentId: comment.id },
        {
          withCredentials: true,
        }
      );
        // console.log(response)
        setLiked(!liked);
        if (liked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };


  const checkLiked = async () => {
    try {
        const data = {
            CommentId: comment.id,
        }
      const response = await axios.post(`http://localhost:5051/checkLikeComment`, data, {
        withCredentials: true,
      });
    //   console.log(response)
      setLiked(response.data.response) 
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  }

  useEffect(() => {

    checkLiked();

  });

  const handleRepliesButtonClick = async (id) => {
    try {

      const response = await axios.get(`http://localhost:5050/comments/replies/${id}`,
      
      
      {
        withCredentials: true,
      });
      console.log(response)
      console.log("This is the comment id " + comment.id)
      setReplies(response.data.result || []) 
      setShowReplies(!showReplies);
      
    } catch (error) {
      console.error( 'Error fetching replies:', error);
      console.log(comment.id)
    }
  };

  const handleReplyClick = (comment) => {
    setShowReplyInput(!showReplyInput);
    setReplyCommentId(comment.id);
  };

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        CommentID: replyCommentId,
        ReplyText: replyContent,
      };

      await axios.post('http://localhost:5050/replies/newReply', data, {
        withCredentials: true,
      });

      // Reset the reply form

      setShowReplyInput(false);
      setReplyCommentId(null);
      setReplyContent('');
      setReplyCount(replyCount + 1);
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  return (
    <div  className="comment">
    <div className="comment__avatar">
      <Avatar src={comment.ProfilePicture} />
    </div>
    <div className="comment__body">
      <div className="comment__header">
        <div className="comment__headerText">
          <h3>
            {comment.Username}{' '}
            {comment.Username && (
              <span className="comment__headerSpecial">
                <MdVerified className="comment__badge" /> @{comment.Username}
              </span>
            )}
          </h3>
        </div>
        <div className="comment__headerDescription">
            {console.log(comment.id)}
          <p>{comment.commentText}</p>
        </div>
      </div>
      <div className="comment__footer">
        <div className="reply">
          <BsReply fontSize="small" onClick={() => handleReplyClick(comment.id)} />
          <span>{replyCount}</span>
        </div>

        <div className="like">
          <FcLikePlaceholder
            id='hey'
            fontSize="small"
            className={` ${liked ? "liked" : ""}`}
            onClick={() => handleLikeClick(comment.id)}
          />
          <span>{likeCount}</span>
        </div>
      </div>

      {/* Reply form */}
      {showReplyInput && replyCommentId === comment.id && (
        <div className="reply-form">
          <form onSubmit={handleReplySubmit}>
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              required
            />
            <button type="submit">Reply</button>
          </form>
        </div>
      )}

      {/* Display replies */}
      {showReplies &&( replies.map((reply) => (
        <div key={reply.ReplyId} className="comment reply-comment">
          <div className="comment__avatar">
            <Avatar src={reply.ProfilePicture} />
          </div>
          <div className="comment__body">
            <div className="comment__header">
              <div className="comment__headerText">
                <h3>
                  {reply.User}{' '}
                  {reply.User && (
                    <span className="comment__headerSpecial">
                      <MdVerified className="comment__badge" /> @{reply.User}
                    </span>
                  )}
                </h3>
              </div>
              <div className="comment__headerDescription">
                <p>{reply.ReplyText}</p>
              </div>
            </div>
          </div>
        </div>
      )))}
    </div>
    {/* Toggle button for replies */}
    <button className="toggle-replies-button" onClick={() => handleRepliesButtonClick(comment.id)}>
      {replies[comment.id] ? 'Hide Replies' : 'Show Replies'}
    </button>
  </div>
  );
}

export default Comment;