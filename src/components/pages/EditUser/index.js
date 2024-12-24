import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, TextField, Button, Box } from '@mui/material'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'

import { editUser } from '../../../api'
import { useFetchUser, useNavigateBasedOnReferrer } from '../../../api/hooks'
import EmptyState from '../../EmptyState'
import UserAvatar from '../../Avatar'

const StyledContainer = styled(Container)`
  margin-top: 30px;
`

const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const AvatarContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
`

function UserEdit () {
  const { id } = useParams()
  const userId = useMemo(() => parseInt(id) || 1, [id])
  const firstNameRef = useRef()
  const lastNameRef = useRef()

  const [loading, setLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar()
  const { user } = useFetchUser(userId, setLoading)
  const goBack = useNavigateBasedOnReferrer()

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)
      const firstName = firstNameRef.current.value
      const lastName = lastNameRef.current.value
      try {
        await editUser(userId, `${firstName} ${lastName}`)
        enqueueSnackbar('User updated successfully!', {
          variant: 'success',
          onClose: goBack
        })
      } catch (error) {
        enqueueSnackbar('Failed to update user. Please try again later.', {
          variant: 'error'
        })
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goBack, userId]
  )
  const render = () => {
    if (!user) {
      return <EmptyState description='User not found.' />
    }
    return (
      <Form component='form' onSubmit={handleSubmit}>
        <AvatarContainer>
          <UserAvatar user={user} avatarSize={100} />
        </AvatarContainer>

        <TextField
          inputRef={firstNameRef}
          label='First Name'
          name='first_name'
          defaultValue={user.first_name}
          fullWidth
          required
        />
        <TextField
          inputRef={lastNameRef}
          label='Last Name'
          name='last_name'
          defaultValue={user.last_name}
          fullWidth
          required
        />
        <TextField
          label='Email'
          name='email'
          defaultValue={user.email}
          fullWidth
          disabled
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={loading}
        >
          Save
        </Button>
        <Button
          type='button'
          variant='outlined'
          color='secondary'
          onClick={goBack}
        >
          Back
        </Button>
      </Form>
    )
  }
  return <StyledContainer maxWidth='sm'>{render()}</StyledContainer>
}

export default UserEdit
