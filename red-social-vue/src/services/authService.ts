import axios from 'axios'

const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export const authService = {
  async login(data: LoginData) {
    const response = await axios.post(`${API_AUTH_URL}/login`, data)
    return response.data
  },

  async register(data: RegisterData) {
    const response = await axios.post(`${API_AUTH_URL}/register`, data)
    return response.data
  }
}