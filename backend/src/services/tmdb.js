import axios from 'axios';
import 'dotenv/config';

console.log('token', process.env.API_ACCESS_TOKEN_TMDB);

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.API_ACCESS_TOKEN_TMDB}`,
    'Content-Type': 'application/json',
  },
});
