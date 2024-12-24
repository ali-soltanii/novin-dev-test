import React, { useCallback, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@mui/material/CssBaseline'

import { PrivateRoute, PublicRoute } from './AuthenticatedRoute'
import { ROUTES } from './routes'

import NavBar from '../components/NavBar'
import Login from '../components/pages/Login'
import Home from '../components/pages/Home'
import AddUser from '../components/pages/AddUser'
import UserDetail from '../components/pages/UserDetail'
import UserEdit from '../components/pages/EditUser'
import LogOutDialog from '../components/LogOutDialog'

import { getToken, removeToken, setToken } from '../api/auth'

function AppRouter () {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())
  const [isLogOutDialogOpen, setLogOutDialogOpen] = useState(false)

  const setAuth = useCallback((token = '') => {
    setToken(token)
    setIsLoggedIn(true)
  }, [])

  const openLogOutDialog = useCallback(() => {
    setLogOutDialogOpen(true)
  }, [])

  const closeLogOutDialog = useCallback(() => {
    setLogOutDialogOpen(false)
  }, [])

  const logOut = useCallback(() => {
    closeLogOutDialog()
    removeToken()
    setIsLoggedIn(false)
  }, [closeLogOutDialog])

  return (
    <>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Router>
          {isLoggedIn && <NavBar logOut={openLogOutDialog} />}
          <Routes>
            <Route
              path={ROUTES.LOGIN}
              element={
                <PublicRoute auth={isLoggedIn}>
                  <Login setAuth={setAuth} />
                </PublicRoute>
              }
            />
            <Route
              path={`${ROUTES.USER}/:id`}
              element={
                <PrivateRoute auth={isLoggedIn}>
                  <UserDetail />
                </PrivateRoute>
              }
            />
            <Route
              path={`${ROUTES.EDIT_USER}/:id`}
              element={
                <PrivateRoute auth={isLoggedIn}>
                  <UserEdit />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.ADD_USER}
              element={
                <PrivateRoute auth={isLoggedIn}>
                  <AddUser />
                </PrivateRoute>
              }
            />
            <Route
              path={`${ROUTES.HOME}/:pageNumber`}
              element={
                <PrivateRoute auth={isLoggedIn}>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.HOME}
              element={
                <PrivateRoute auth={isLoggedIn}>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Router>
        <LogOutDialog
          open={isLogOutDialogOpen}
          handleClose={closeLogOutDialog}
          handleLogout={logOut}
        />
      </SnackbarProvider>
    </>
  )
}

export default AppRouter
