/** @format */

export const auth = {
  users: JSON.parse(localStorage.getItem('users')),
  token: localStorage.getItem('token'),
  auth: localStorage.getItem('auth'),
}
