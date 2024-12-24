import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { getUser } from '.'

export const useFetchUser = (userId, setLoading) => {
  const [user, setUser] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const response = await getUser(userId)
        setUser(response.data.data)
      } catch (error) {
        enqueueSnackbar(
          'Failed to fetch user details. Please try again later.',
          { variant: 'error' }
        )
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId, enqueueSnackbar, setLoading])

  return { user }
}

export const useNavigateBasedOnReferrer = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateBasedOnReferrer = useCallback(() => {
    if (location.state && location.state.fromApp) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }, [navigate, location.state])

  return navigateBasedOnReferrer
}
