import axios from "axios";

const baseURL =
  process.env.GATSBY_API_BASE_URL ??
  process.env.API_BASE_URL ??
  "https://api.tracktak.com/";

export default axios.create({
  baseURL,
});
