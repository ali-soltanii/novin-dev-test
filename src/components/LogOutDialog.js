import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

function LogoutDialog ({ open, handleClose, handleLogout }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to log out?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleLogout} color='secondary'>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LogoutDialog
