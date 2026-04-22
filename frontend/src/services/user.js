import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

export const getUserInfo = async () => {
  await axios.get(base)
}