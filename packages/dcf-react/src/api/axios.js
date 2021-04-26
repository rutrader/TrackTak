import axios from "axios";

console.log(process.env.GATSBY_API_BASE_URL);

const baseURL =
  process.env.GATSBY_API_BASE_URL ??
  process.env.API_BASE_URL ??
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/"
    : "https://api.tracktak.com/";

export default axios.create({
  baseURL,
});
