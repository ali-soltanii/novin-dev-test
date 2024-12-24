import React, { useCallback, useRef, useState } from 'react'
import { Button, TextField, Container, Box, Typography } from '@mui/material'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'

import { login } from '../../../api'

const StyledContainer = styled(Container)`
  margin-top: 30px;
`

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
`

function Login ({ setAuth }) {
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)
      try {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const response = await login(email, password)
        const token = response.data?.token
        if (token) {
          setAuth(token)
          enqueueSnackbar('Login successful', { variant: 'success' })
        } else {
          enqueueSnackbar('Login failed: No token received', {
            variant: 'error'
          })
        }
      } catch (error) {
        enqueueSnackbar('Login failed: Invalid credentials', {
          variant: 'error'
        })
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setAuth]
  )

  return (
    <StyledContainer maxWidth='sm'>
      <Typography variant='h1' component='h1' textAlign='center'>
        Login
      </Typography>
      <StyledBox component='form' onSubmit={handleSubmit}>
        <TextField fullWidth label='Email' inputRef={emailRef} required />
        <TextField
          fullWidth
          label='Password'
          type='password'
          inputRef={passwordRef}
          required
        />
        <Button
          fullWidth
          type='submit'
          variant='contained'
          color='primary'
          disabled={loading}
        >
          Login
        </Button>
      </StyledBox>
    </StyledContainer>
  )
}

export default Login
