import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children, auth }) => {
  return auth ? children : <Navigate to='/login' />
}
export const PublicRoute = ({ children, auth }) => {
  return auth ? <Navigate to='/' /> : children
}
