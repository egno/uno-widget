import axios from 'axios'
import { uuidv4 } from '@/utils'

export default () => {
  const requestId = uuidv4()
  let options = {
    baseURL: process.env.VUE_APP_API,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Prefer: 'count=exact',
      'X-Request-ID': requestId
    }
  }
  return axios.create(options)
}
