import React, {createContext,useState} from "react";
import { Link, Outlet} from "react-router-dom";
import Sidebar from './Sidebar'
import Profile from './Profile'
import Feed from './Feed'
import Notification from './Notifications'
import Settings from './Settings'
import UserProfiles from  './usersProfile'
import Search from './Search'
import Logout from './Logout'
import Widgets from './Widgets'
import './dashboard.css'
import Comments from "./Comments";

export const ThemeContext = createContext();


const Dashboard = () => {

  const [theme, setTheme] = useState('light');
  

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [activeComponent, setActiveComponent] = useState('feed');
  const [activePost, setActivePost] = useState(null)
  const [activeTab, setActiveTab] = useState('posts'); // New state for active profile tab
  const [profileTab, setActiveProfileTab] = useState(null)
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  


  
  const renderComponent = (componentName) => {
    setActiveComponent(componentName);


    if (componentName === 'profile') {
      setActiveTab('posts'); // Set the active tab to 'posts' when navigating to the profile section
    }


  };






  
  const handlePostClick = (post) => {
     setActivePost(post)
    setActiveComponent('comments');
  };



  const handleProfileClick = (result) =>{
    setActiveProfileTab(result)
    setSelectedUserId(result.UserId);
    setActiveComponent('userProfile')
  }





  return (
    <>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className="app">
     
   
      <Sidebar onComponentClick={renderComponent}/>

      {activeComponent === 'feed' && <Feed onPostClick={handlePostClick} />}

      {activeComponent === 'search' && <Search  onProfileClick ={handleProfileClick}/>}

      {activeComponent === 'notifications' && <Notification />}

      {activeComponent === 'profile' && <Profile activeTab={activeTab}   onPostClick={handlePostClick}  onProfileClick ={handleProfileClick}  />}

      {activeComponent === 'settings' && <Settings />}

      {activeComponent === 'comments' && <Comments post = {activePost} />}

      {activeComponent === 'userProfile' && <UserProfiles user = {profileTab}  id={selectedUserId}  />}

      {activeComponent === 'logout' && <Logout user = {profileTab} />}

      {/* AiOutlineLogout */}


      {/* post = {activeComponent} */}
      {/* post = {activePost} */}
       

       {/* Feed */}
      
    

       <Widgets/>
       {/* Widgets */} 

    </div>
     
    </ThemeContext.Provider>
    </>
  )
}

export default Dashboard
