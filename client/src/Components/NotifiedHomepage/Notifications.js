import React, { useEffect, useState } from 'react';
import { Avatar, Button } from '@mui/material';
import axios from 'axios';
import './Notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5051/notify/displayNotification', {
        withCredentials: true,
      });
      setNotifications(response.data.results);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markNotificationAsRead = async (id) => {
    try {

      const data = {
        NotificationID: id
      }
      await axios.post('http://localhost:5051/notify/markRead', data, { withCredentials: true });
      // Refresh the notifications after marking as read
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const recipientId = notifications.length > 0 ? notifications[0].Recipient_id : null;
      if (recipientId) {
        await axios.post('http://localhost:5051/notify/AllRead', { recipientId }, { withCredentials: true });
        // Refresh the notifications after marking all as read
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return (
    <div className='notificationsFeed'>
      <div className='notificationsHeader'>
        <h1>Notifications</h1>
        <Button className='markAllAsReadButton' onClick={markAllNotificationsAsRead}>
          Mark All As Read
        </Button>
      </div>

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

            <div className='markAsReadButton'>
              <Button className='tweetBox_tweetButton' onClick={() => markNotificationAsRead(notification.id)}>
                Mark as Read
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
