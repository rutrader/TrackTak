import axios from 'axios'

export default axios.create({
  baseURL: process.env.GATSBY_API_BASE_URL
})
