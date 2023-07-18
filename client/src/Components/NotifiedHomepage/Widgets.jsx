import React from 'react'
import './Widgets.css'
import { Avatar,Button} from "@mui/material"

const Widgets =()=> {
  return (
    <div className='widgets'>

    <div className='followersFollowing'>
       <div className='followersTitle'>
         <button>Who to follow</button>
       </div>
        
       <div className='followingTitle'>
         <button>+</button>

       </div>
 
     

    </div>


    <div className='searchFollow'>
     <input className='follow_input' placeholder="what's happening" type='text'/>
     </div>

     <div className='following'>

   <div className='follow_details'>
     <div className='followProfilePic'>
     <img className='profile_pic' src='C:/Users/tonym/Desktop/FinalJituProject/client/src/assets/tree-736885_1280.jpg'/>
     </div>

    <div className='followUserNames'>
  <h2>Hellooo</h2>
    
    <h2>Hellooo</h2>

      

    </div>
    <div className='followButton'>
    <Button className='tweetBox_tweetButton'>Follow</Button>
    </div>

   </div>


   {/* another one */}
   <div className='follow_details'>
     <div className='followProfilePic'>
     <img className='profile_pic' src='C:/Users/tonym/Desktop/FinalJituProject/client/src/assets/tree-736885_1280.jpg'/>
     </div>

    <div className='followUserNames'>
  <h2>Hellooo</h2>
    
    <h2>Hellooo</h2>

     

    </div>
    <div className='followButton'>
    <Button className='tweetBox_tweetButton'>Follow</Button>
    </div>

   </div>










</div>

    </div>
   
  )
}

export default Widgets
