import axios from "axios";

let baseURL = process.env.GATSBY_API_BASE_URL ?? "https://api.tracktak.com/";

export default axios.create({
  baseURL,
});
