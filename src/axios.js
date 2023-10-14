import axios from "axios";

const instance = axios.create({
  baseURL: "https://eat-away-backend-production.up.railway.app/api/",
});

export default instance;