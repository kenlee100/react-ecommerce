const { VITE_PATH, VITE_URL } = import.meta.env

import axios from 'axios'
import toast from '@utils/toast'

const service = axios.create({
  baseURL: `${VITE_URL}/api/${VITE_PATH}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  },
  timeout: 60 * 1000
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response?.data || {}
  },
  (error) => {
    const { response: { data: { message }, status } = {} } = error
    switch (status) {
      case 400:
      case 401:
      case 404:
        toast.fire({
          icon: 'error',
          title: message
        })
        console.error(message)
        break
      default:
        console.error(error)
    }
    return Promise.reject(error)
  }
)
export default service
