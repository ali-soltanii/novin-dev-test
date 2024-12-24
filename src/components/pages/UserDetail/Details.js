import React, { useCallback, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../../router/routes'
import UserAvatar from '../../Avatar'
import { useNavigateBasedOnReferrer } from '../../../api/hooks'

const UserInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
`
const UserDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

function Details ({ user, onDeleteUser }) {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const navigate = useNavigate()
  const goBack = useNavigateBasedOnReferrer()

  const handleEdit = useCallback(() => {
    navigate(`${ROUTES.EDIT_USER}/${user.id}`)
  }, [navigate, user.id])

  const handleDelete = useCallback(() => {
    setDialogOpen(true)
  }, [setDialogOpen])

  const handleClose = useCallback(() => {
    setDialogOpen(false)
  }, [setDialogOpen])

  const handleConfirmDelete = useCallback(() => {
    setDialogOpen(false)
    onDeleteUser(user.id)
  }, [setDialogOpen, onDeleteUser, user.id])

  return (
    <UserInfo>
      <UserAvatar user={user} />
      <UserDetails>
        <Typography variant='h4' gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant='body1'>
          <strong>Email:</strong> {user.email}
        </Typography>
        <ButtonContainer>
          <Button variant='outlined' color='secondary' onClick={goBack}>
            Back
          </Button>
          <Button variant='contained' color='primary' onClick={handleEdit}>
            Edit
          </Button>
          <Button variant='contained' color='secondary' onClick={handleDelete}>
            Delete
          </Button>
        </ButtonContainer>
      </UserDetails>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {user.first_name} {user.last_name}?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </UserInfo>
  )
}

export default Details
