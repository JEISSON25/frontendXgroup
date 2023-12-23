/** @format */

import axios from 'axios'

const env = () => {
  return axios.create({
    baseURL: `http://localhost:8004/v1/`,
  })
}

export const api = env()
