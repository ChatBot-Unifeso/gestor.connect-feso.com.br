import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3003',
})

api.interceptors.request.use((config) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9lbXBsb3llZSI6IjliMTg3Yjk0LTk1ZjEtNGViNi1iNzA1LWQ4MjZhYTY1NTIwOCIsIm5hbWUiOiJyb290IiwiZW1haWwiOiJhZG1AYWRtLmNvbSIsImlkX2NvbXBhbnkiOiIwODU3MjBhNi1hZDZhLTRlMjMtODk5OS1kM2I1MTdkOGZiYTEiLCJyb2xlcyI6ImFkbSIsImlhdCI6MTcxMjkyODk2OX0.49s4Angsf-X8Ay3h9AOPMqb-NJoNIcTl7cNDnC_34a8'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})