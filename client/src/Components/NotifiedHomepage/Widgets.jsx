import React, { useState, useEffect, useRef} from 'react';
import './Widgets.css'
import axios from 'axios';
import SuggestionHandler from './userSuggeseted'
import { Avatar,Button} from "@mui/material"

const Widgets =()=> {


  const [suggestedInfo,  setSuggestedInfo] = useState([]);









///use effect for following
useEffect(() => {
  const fetchSuggestions = async () => {
    try {
      const response = await axios.get('http://localhost:5051/aboutFollow/suggested', {
        withCredentials: true,
      });
      console.log(response.data.data)
      setSuggestedInfo(response.data.data);//
     
    } catch (error) {
      console.error('Error fetching suggestion users:', error);
    }
  };

  fetchSuggestions();
}, []);















  return (
    <div className='widgets'>

    

    <div className='searchFollow'>
     <input className='follow_input' placeholder="Search" type='text'/>
     </div>

     <div className='following'>

   

{/* creazy */}


<div className='tabContent'>
           <h3>Who you can follow</h3>
    {suggestedInfo.map(( userSuggested) => (
          <SuggestionHandler
            key={ userSuggested.UserID}
            userSuggested={ userSuggested}
            // onClick={() => handlePostClick(post)}
          />
        ))}
 
     

    </div>






{/* creazy */}
   {/* another one */}
  










</div>

    </div>
   
  )
}

export default Widgets
