import React from 'react'
import { Box, CircularProgress } from '@mui/material'

function Loading () {
  return (
    <Box display='flex' justifyContent='center' mt={2}>
      <CircularProgress />
    </Box>
  )
}

export default Loading
