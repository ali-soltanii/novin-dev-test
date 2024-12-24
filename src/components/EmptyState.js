import React from 'react'
import { Box, Typography } from '@mui/material'

function EmptyState ({ description }) {
  return (
    <Box mt={2}>
      <Typography variant='body1'>{description}</Typography>
    </Box>
  )
}

export default EmptyState
