import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../../components/comp/sidebar';
import Search from './search';
import Favorites from './favorites';
import Login from '../Auth/login';
import Feed from './feed';
import Library from './library';
import Notifications from './notifications';
import Settings from './settings';
import '../css/home.css';
import axios from 'axios';
import setClientToken from '../../spotify';
import apiClient from '../../spotify'; // Assuming apiClient is imported from spotify

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
      // Exchange the code for an access token
      const exchangeCodeForToken = async () => {
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

          const { access_token } = response.data;

          // Save the new token to localStorage
          localStorage.setItem('spotifyToken', access_token);

          // Now set the client token with the fresh one
          setToken(access_token);
          setClientToken(access_token);

          // Clear the URL query params after using the code
          window.history.pushState({}, null, '/'); 
        } catch (error) {
          console.error('Error exchanging code for token:', error);
        }
      };

      exchangeCodeForToken();
    } else {
      // If no code, check localStorage for existing token
      const storedToken = localStorage.getItem('spotifyToken');
      if (storedToken && !token) {
        setToken(storedToken);
        setClientToken(storedToken);
      }
    }
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem('spotifyToken');
    if (token) {
      apiClient.defaults.headers.Authorization = `Bearer ${token}`;
      apiClient.get('me')
        .then((response) => {
          console.log('User data:', response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.error('Spotify API Error:', error.response.status, error.response.data);
          } else {
            console.error('API request failed:', error.message);
          }
        });
    } else {
      console.error('No token found. Please log in.');
    }
  }, []);

  return (
    <Router>
      <div className="main-body">
        {!token ? (
          <Login />
        ) : (
          <>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Library />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}
