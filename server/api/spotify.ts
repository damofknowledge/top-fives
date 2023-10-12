import { Buffer } from 'buffer';
import axios from 'axios';

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig();
  const auth_token = Buffer.from(
    `${runtimeConfig.public.spotifyClientId}:${runtimeConfig.spotifyClientSecret}`,
    'utf-8'
  ).toString('base64');
  const data = {
    grant_type: 'client_credentials',
  };
  const config = {
    headers: {
      Authorization: `Basic ${auth_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const response = await axios.post('https://accounts.spotify.com/api/token', data, config);
  return response.data.access_token;
});
