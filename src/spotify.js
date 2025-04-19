const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = '3367495a4aeb4245b384e08befaef7d2'; // Replace with your client ID
const redirectUri = 'http://127.0.0.1:3000/callback'; // Use explicit loopback address for local development
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndPoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}&response_type=code&show_dialog=true`;
