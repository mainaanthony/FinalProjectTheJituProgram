// import React from 'react' 


// import { Avatar,Button} from "@mui/material"
// import './Notifications.css'


// function Notifications() {
//   return (
//     <div className='notificationsFeed'>
//          <h1> Notifications</h1>
        

// <div className='notifications'>

// <div className='notifications_details'>
//   <div className='notificationsProfilePic'>
//   <img className='profile_pic' src='C:/Users/tonym/Desktop/FinalJituProject/client/src/assets/tree-736885_1280.jpg'/>
//   </div>

//  <div className='followUserNames'>
// <h2>Hellooo</h2>
 
//  <h2>Hellooo</h2>

   

//  </div>
//  <div className='followButton'>
//  <Button className='tweetBox_tweetButton'>Follow</Button>
//  </div>

// </div>


// {/* another one */}
// <div className='notifications_details'>
//   <div className='followProfilePic'>
//   <img className='profile_pic' src='C:/Users/tonym/Desktop/FinalJituProject/client/src/assets/tree-736885_1280.jpg'/>
//   </div>

//  <div className='followUserNames'>
// <h2>Hellooo</h2>
 
//  <h2>Hellooo</h2>

  

//  </div>
//  <div className='followButton'>
//  <Button className='tweetBox_tweetButton'>Follow</Button>
//  </div>

// </div>










// </div>




//         </div>
//   )
// }

// export default Notifications

import React, { useEffect, useState } from 'react';
import { Avatar, Button } from '@mui/material';
import axios from 'axios';
import './Notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5050/notify/displayNotification', {
          withCredentials: true,
        });
        setNotifications(response.data.results);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleFollow = (notification) => {
    // Implement logic to follow/unfollow the user
    console.log('Follow/Unfollow', notification);
  };

  return (
    <div className='notificationsFeed'>
      <h1>Notifications</h1>

      <div className='notifications'>
        {notifications.map((notification) => (
          <div className='notifications_details' key={notification.id}>
            <div className='notificationsProfilePic'>
              <Avatar src={notification.ProfilePicUrl} />
            </div>

            <div className='followUserNames'>
              <div className='nameSection'>
                <h2>{notification.take_action_user_Name}</h2>
                <span className='username'>@{notification.take_action_user_UserName}</span>
              </div>
              <div className='descriptionSection'>
                <p>{notification.Description}</p>
              </div>
            </div>

            {notification.NotificationType !== 'Follow' ? (
              <div className='followButton'>
                <Button className='tweetBox_tweetButton'>Follow</Button>
              </div>
            ) : (
              <div className='followButton'>
                <Button
                  className='tweetBox_tweetButton'
                  variant='contained'
                  color={notification.isFollow ? 'primary' : 'secondary'}
                  onClick={() => handleFollow(notification)}
                >
                  {notification.isFollow ? 'Follow' : 'Unfollow'}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
