/** @format */

import axios from 'axios'

const env = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })
}

export const api = env()
