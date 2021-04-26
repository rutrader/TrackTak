import axios from "axios";

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

let baseURL =
  process.env.GATSBY_API_BASE_URL ??
  process.env.API_BASE_URL ??
  "https://api.tracktak.com/";

if (activeEnv === "development") {
  baseURL = "http://localhost:3001/";
}

if (activeEnv === "staging") {
  baseURL = "http://api.staging.tracktak.com/";
}

export default axios.create({
  baseURL,
});
