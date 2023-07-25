import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import { Avatar } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { AiFillHome, AiOutlineTwitter, AiOutlineLogout } from "react-icons/ai";
import {GrUserSettings} from 'react-icons/gr'
import { MdPermIdentity, MdNotificationsNone, MdMailOutline } from "react-icons/md";
import { ThemeContext } from './dashboard';
import axios from 'axios';
import SidebarOption from "./SidebarOption";

const Sidebar = ({ onComponentClick }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeComponent, setActiveComponent] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const handleComponentClick = (component) => {
    setActiveComponent(component);
    onComponentClick(component);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5051/posts/info', {
          withCredentials: true
        });
        setUserInfo(response.data.result);
       console.log(response)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="sidebar">
      {/* <AiOutlineTwitter className="sidebar_twitterIcon" onClick={toggleTheme} /> */}

      <div className="top_header">
        <div className="profile">
          <Avatar className="profile_pic" src={userInfo.ProfilePicUrl} />
          <div className="postNameDetails">
              <h3>{userInfo.Name}</h3>
              <p>@{userInfo.userName}</p>
          </div>
        </div>
      </div>

      {/* <div className="postFollowDetails">
        <div className="details">
          <div className="nameDits">Posts</div>
          <div className="numberDits">{userInfo.TotalPosts}</div>
        </div>

        <div className="details">
          <div className="nameDits">Followers</div>
          <div className="numberDits">{userInfo.Following}</div>
        </div>

        <div className="details">
          <div className="nameDits">Following</div>
          <div className="numberDits">{userInfo.Followers}</div>
        </div>
      </div> */}

      <div className="links">
        <SidebarOption 
          isActive={activeComponent === "feed"}
          onClick={() => handleComponentClick("feed")}
          Icon={AiFillHome}
          text="Home"
        />
        <SidebarOption
          isActive={activeComponent === "search"}
          onClick={() => handleComponentClick("search")}
          Icon={BiSearch}
          text="Explore"
        />
        <SidebarOption
          isActive={activeComponent === "notifications"}
          onClick={() => handleComponentClick("notifications")}
          Icon={MdNotificationsNone}
          text="Notifications"
        />
        <SidebarOption
          isActive={activeComponent === "settings"}
          onClick={() => handleComponentClick("settings")}
          Icon={GrUserSettings}
          text="Settings"
        />
        <SidebarOption
          isActive={activeComponent === "profile"}
          onClick={() => handleComponentClick("profile")}
          Icon={MdPermIdentity}
          text="Profiles"
        />

        <SidebarOption
          isActive={activeComponent === "logout"}
          onClick={() => handleComponentClick("logout")}
          Icon={AiOutlineLogout}
          text="Logout"
        />
      </div>
    </div>
  );
};

export default Sidebar;


