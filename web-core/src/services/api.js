import axios from 'axios'

export const TOKEN_KEY = 'cm_token'
export const USER_KEY = 'cm_user'

const defaultBaseURL =
  import.meta.env.MODE === 'github'
    ? 'https://cajamaynassem14-production.up.railway.app'
    : 'http://localhost:8003'

const baseURL = import.meta.env.VITE_BASE_URL || defaultBaseURL

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token && token !== 'demo-cajamaynas') {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export default api
