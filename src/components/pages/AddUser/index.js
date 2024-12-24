import React, { useCallback, useRef, useState } from 'react'
import { Container, TextField, Button, Box, Typography } from '@mui/material'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'

import { useNavigateBasedOnReferrer } from '../../../api/hooks'
import { addUser } from '../../../api'

const FormContainer = styled(Container)`
  margin-top: 30px;
`

const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

function AddUser () {
  const [loading, setLoading] = useState(false)
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const jobRef = useRef()

  const goBack = useNavigateBasedOnReferrer()

  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)
      try {
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const job = jobRef.current.value
        await addUser(`${firstName} ${lastName}`, job)
        enqueueSnackbar('User added successfully!', {
          variant: 'success',
          onClose: goBack
        })
      } catch (error) {
        enqueueSnackbar('Failed to add user. Please try again.', {
          variant: 'error'
        })
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goBack]
  )

  return (
    <FormContainer maxWidth='sm'>
      <Typography variant='h4' component='h1' gutterBottom>
        Add New User
      </Typography>
      <Form component='form' onSubmit={handleSubmit}>
        <TextField
          inputRef={firstNameRef}
          label='First Name'
          name='first_name'
          fullWidth
          required
        />
        <TextField
          inputRef={lastNameRef}
          label='Last Name'
          name='last_name'
          fullWidth
          required
        />
        <TextField inputRef={jobRef} label='Job' name='job' fullWidth />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={loading}
          required
        >
          Add User
        </Button>
      </Form>
    </FormContainer>
  )
}

export default AddUser
