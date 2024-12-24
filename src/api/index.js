import axios from './axios'

export const getUsers = (page = 1) => {
  return axios.get(`/users?page=${page}`)
}
export const getUser = (userId = 0) => {
  return axios.get(`/users/${userId}`)
}
export const login = (email = '', password = '') => {
  return axios.post('/login', {
    email,
    password
  })
}
export const addUser = (name = '', job = '') => {
  return axios.post('/users', { name, job })
}
export const editUser = (userId = 0, name = '', job = '') => {
  return axios.put(`/users/${userId}`, { name, job })
}
export const deleteUser = (userId = 0) => {
  return axios.delete(`/users/${userId}`)
}
