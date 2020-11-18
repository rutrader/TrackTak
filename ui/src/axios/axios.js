import axios from "axios";
console.log(process.env.REACT_APP_API_BASE_URL);

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
