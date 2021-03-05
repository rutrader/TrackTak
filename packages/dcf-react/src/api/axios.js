import axios from "axios";

export default axios.create({
  baseURL:
    process.env.TRACKTAK_API_BASE_URL ??
    process.env.GATSBY_API_BASE_URL ??
    process.env.REACT_APP_API_BASE_URL ??
    "https://api.tracktak.com/",
});
