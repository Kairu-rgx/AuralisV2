import React, { useState, useEffect } from 'react';
import '../css/sidebar.css';
import SidebarButton from './sidebarButton';
import { IoHomeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications, IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import apiClient, { setClientToken } from '../../spotify';
import axios from 'axios';

export default function Sidebar() {
  const [image, setImage] = useState(
    "https://i.pinimg.com/474x/bd/af/6d/bdaf6d8fe7871aa0a0fdf89f0587fd69.jpg"
  );
  const [token, setToken] = useState(null);

  const exchangeCodeForToken = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (!code) {
      console.error('Authorization code not found in URL.');
      return;
    }

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'http://127.0.0.1:3000/callback',
          client_id: '3367495a4aeb4245b384e08befaef7d2',
          client_secret: '4ecb47ab44a94af4bde327b38ef8720b',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Token exchange response:', response.data);
      console.log('Scopes included in token:', response.data.scope);
      const { access_token } = response.data;
      if (access_token) {
        setClientToken(access_token);
        console.log('Token set successfully:', access_token);
        setToken(access_token);
        localStorage.setItem('spotifyToken', access_token);
        apiClient.defaults.headers.Authorization = `Bearer ${access_token}`;
        window.history.pushState({}, null, '/');
      } else {
        console.error('No access token in response.');
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('spotifyToken');
    console.log('Token retrieved from localStorage:', storedToken);

    if (storedToken) {
      setClientToken(storedToken);
      console.log('apiClient headers before API call:', apiClient.defaults.headers);

      apiClient.get('me')
        .then((response) => {
          console.log('User data fetched successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        });
    } else {
      console.warn('No token found. Attempting to exchange code for token.');
      exchangeCodeForToken();
    }
  }, []);

  return (
    <div className='sidebar-container'>
      <img src={image} className="profile-img" alt='Profile' />
      <div>
        <SidebarButton title="feed" to="/feed" icon={<IoHomeSharp />} />
        <SidebarButton title="search" to="/search" icon={<FaSearch />} />
        <SidebarButton title="notification" to="/notifications" icon={<IoIosNotifications />} />
        <SidebarButton title="settings" to="/settings" icon={<IoSettingsOutline />} />
      </div>
      <div className='friend-section'>
        <img src="https://placehold.co/300x300" alt="Friend" className="friend-img" />
      </div>
      <SidebarButton title="Log Out" to="" icon={<IoIosLogOut />} />
    </div>
  );
}
