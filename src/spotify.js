import axios from 'axios';

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = '3367495a4aeb4245b384e08befaef7d2';
const redirectUri = 'http://127.0.0.1:3000/callback';
const scopes = [
  "user-read-private",
  "user-read-email",
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-recently-played",
];

export const loginEndPoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${scopes.join('%20')}&response_type=code&show_dialog=true`;

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

let interceptor; // track active interceptor

export const setClientToken = (token) => {
  if (interceptor) apiClient.interceptors.request.eject(interceptor);
  interceptor = apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Interceptor set. Authorization header:', `Bearer ${token}`);
    return config;
  });
};

export default apiClient;
