
import React from 'react'
import { Avatar,Button} from "@mui/material"
import './followerFollowingHandler.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function followerFollowingHandler({follower}) {










    const handleFollow = async (FollowerUserName) => {
        const data = {
            FollowedUserName: FollowerUserName
        }
        const response = await axios.post('http://localhost:5051/aboutFollow/follow', data, {
            withCredentials:true,
        })
        if(response.status === 200){
          toast.success('Followed successfully')
        
        }
        
    
        console.log(response)
      };











  return (
   
        
        <div className="follower">
                    <div>

                        <img src={follower.FollowerProfilePic } alt="" className='followerImage' />
                        {/* follower.img */}
                        <div className="name">
                            <span>{follower.FollowerName}</span>
                            {/* follower.name */}
                            <span>@{follower.FollowerUserName}</span>
                            {/* follower.username */}
                        </div>
                    </div>
                    <button className='button fc-button'
                    onClick={() => handleFollow(follower.FollowerUserName)}>
                        Follow
                        
                    </button>
                </div>


        
        
       
  )
}

export default followerFollowingHandler



