import React from 'react'
import { Avatar,Button} from "@mui/material"
import './following.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function followerFollowingHandler({following}) {


    const handleFollow = async (FollowingUserName) => {
        const data = {
            FollowedUserName: FollowingUserName
        }
        const response = await axios.post('http://localhost:5051/aboutFollow/unfollow', data, {
            withCredentials:true,
        })
        if(response.status === 200){
          toast.success('UnFollowed successfully')
        
        }
        
    
        console.log(response)
      };














  return (
   
        
        <div className="follower">
                    <div>

                        <img src={following.FollowingProfilePic } alt="" className='followerImage' />
                        {/* follower.img */}
                        <div className="name">
                            <span>{following.FollowingName}</span>
                            {/* follower.name */}
                            <span>@{following.FollowingUserName}</span>
                            {/* follower.username */}
                        </div>
                    </div>
                    <button className='button fc-button'
                    onClick={() => handleFollow(following.FollowingUserName)}>
                        UnFollow
                    </button>
                </div>


        
        
       
  )
}

export default followerFollowingHandler



