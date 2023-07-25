import React, {useState} from 'react'
import './feed.css'
import TweetBox from './TweetBox'
import Post from './Post'
import Comments from './Comments'






const Feed =({onPostClick})=> {


  const [selectedPost, setSelectedPost] = useState(null); // Track the selected post



  const handlePostClick = (post) => {
    onPostClick(post); // Set the selected post when clicked
  };
  





  return (
    <div className='feed'>

<div className="feed_header">

 <h2>For You</h2> 

 <h2>Following</h2>
      
{/* <input className='search_input' placeholder="Search " type='text'/> */}
      
    </div>

<TweetBox />




{selectedPost ? (
        <Comments post={selectedPost} /> // Render the comments page for the selected post
      ) : (
        <Post onPostClick={handlePostClick} /> // Pass the click handler to the Post component
      )}



    </div>
   
  )
}

export default Feed
