import React, {createContext,useState} from "react";
import { Link, Outlet} from "react-router-dom";
import Sidebar from './Sidebar'
import Profile from './Profile'
import Feed from './Feed'
import Notification from './Notifications'
import Messages from './Messages'
import Search from './Search'
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
  
  
  const renderComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  const handlePostClick = (post) => {
     setActivePost(post)
    setActiveComponent('comments');
  };
  return (
    <>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className="app">
     
   
      <Sidebar onComponentClick={renderComponent}/>

      {activeComponent === 'feed' && <Feed onPostClick={handlePostClick} />}

      {activeComponent === 'search' && <Search />}

      {activeComponent === 'notifications' && <Notification />}

      {activeComponent === 'profile' && <Profile />}

      {activeComponent === 'messages' && <Messages />}

      {activeComponent === 'comments' && <Comments post = {activePost} />}
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
