import axios from "axios";

const baseURL =
  process.env.GATSBY_API_BASE_URL ??
  process.env.REACT_APP_API_BASE_URL ??
  process.env.API_BASE_URL;

if (!baseURL) {
  console.error(
    "Please provide a valid baseURL through your .env file, either one of these: GATSBY_API_BASE_URL, REACT_APP_API_BASE_URL or API_BASE_URL depending on your platform",
  );
}

export default axios.create({
  baseURL,
});
