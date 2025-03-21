import axios from "axios";

export default axios.create({  
  baseURL: "http://127.0.0.1:3030/api",
  headers: {
    "Accept": "*/*",
    "Content-type": ["application/json"]
  },
  withCredentials: true
});