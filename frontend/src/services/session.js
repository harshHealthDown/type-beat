import axios from 'axios'
import { token } from './token'
// const baseUrl = 'http://localhost:3001/api/session'

export const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post('/api/session',newObject,config)
  return response.data
}