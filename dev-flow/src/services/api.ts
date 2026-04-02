import axios from "axios";

const api = axios.create({
  baseURL: "https://devflow-api-kni0.onrender.com/",
});

export default api;
