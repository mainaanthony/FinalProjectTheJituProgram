
import React from 'react'
import { Avatar,Button} from "@mui/material"
import './userSuggeseted.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function followerFollowingHandler({userSuggested}) {



    const handleFollow = async (userName) => {
        const data = {
            FollowedUserName: userName
        }
        const response = await axios.post('http://localhost:5051/aboutFollow/follow', data, {
            withCredentials:true,
        })
        console.log(response)
        if(response.status === 200){
          toast.success('Followed successfully')
        
        }
        
    
        console.log(response)
      };








    console.log(userSuggested.userName)
  return (
   
        
        <div className="follower">
                   
                    <div>

                        <img src={userSuggested.ProfilePicUrl } alt="" className='followerImage' />
                        {/* follower.img */}
                        <div className="name">
                            <span>{userSuggested.UserName}</span>
                            {/* follower.name */}
                            <span>@{userSuggested.userName}</span>
                            {/* follower.username */}
                        </div>
                    </div>
                    <button className='button fc-button'
                    onClick={() => handleFollow(userSuggested.userName)}>
                        Follow
                       
                    </button>
                </div>


        
        
       
  )
}

export default followerFollowingHandler



