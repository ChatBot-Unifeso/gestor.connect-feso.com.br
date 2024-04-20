import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3003',
})

api.interceptors.request.use((config) => {
  const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9lbXBsb3llZSI6Ijg0ZDNiMTI5LWNkMmMtNDIxYi04ZmQ1LWJjYjUxNGMzZTQxYSIsIm5hbWUiOiJyb290IiwiZW1haWwiOiJhZG1AYWRtLmNvbSIsImlkX2NvbXBhbnkiOiI5ODdkZDdjMy05N2ZmLTQ4NmYtYjdjNi05YjQ3YzQ5ZTRhMDQiLCJyb2xlcyI6ImFkbSIsImlhdCI6MTcxMzU3MDkyMX0.iDpPFUDYS7xOlJ2LV-qKpbTy0Ia4wslGpbgFt_u1Uks"
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})