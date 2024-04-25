import axios from "axios";

const instance = axios.create({
  baseURL: 'https://eat-away-backend.onrender.com/api/',
});

export default instance;