require('dotenv').config();
import axios from "axios";

export default axios.create({  
  baseURL: `${process.env.HOST}:${process.env.PORTA}/api`,
  headers: {
    "Accept": "*/*",
    "Content-type": ["application/json"]
  },
  withCredentials: true
});