/** @format */

import axios from 'axios'

const envAPI = () => {
  return axios.create({
    baseURL: `http://localhost:8005/v1/`,
    //   baseURL: `https://api.soilbalance.net/v1/`,
  })
}

// Enpoint
const accounts = () => 'accounts/'
const category = () => 'category/'
const process_impact = () => 'process_impact/'
const comments = () => 'comments/'

export const API = envAPI()

export const Accounts = accounts()
export const Category = category()
export const Process_Impact = process_impact()
export const Comments = comments()
