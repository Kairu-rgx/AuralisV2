import React from 'react'
import '../css/sidebar.css'
import SidebarButton from './sidebarButton'
import { IoHomeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

export default function Sidebar() {
  return (
    <div className='sidebar-container'>
      <img src="https://i.pinimg.com/474x/bd/af/6d/bdaf6d8fe7871aa0a0fdf89f0587fd69.jpg" 
      className="profile-img" 
      alt='Profile'
      />
      <div>
        <SidebarButton title="feed" to="/feed" icon={<IoHomeSharp />}/>
        <SidebarButton title="search" to="/search" icon={<FaSearch />}/>
        <SidebarButton title="notification" to="/notifications" icon={<IoIosNotifications />}/>
        <SidebarButton title="settings" to="/settings" icon={<IoSettingsOutline/>}/>
      </div>
      <div className='friend-section'>
        <img src="https:placehold.co/300x300"
        className="friend-img"/>
      </div>
      <SidebarButton title="Log Out" to="" icon={<IoIosLogOut/>}/>
    </div>
  )
}
