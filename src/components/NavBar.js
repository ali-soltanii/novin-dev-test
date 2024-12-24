import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ROUTES } from '../router/routes'

const StyledAppBar = styled(AppBar)`
  margin-bottom: 20px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

function NavBar ({ logOut }) {
  return (
    <StyledAppBar position='static'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button color='inherit' component={StyledLink} to={ROUTES.HOME}>
            Home
          </Button>
          <Button color='inherit' component={StyledLink} to={ROUTES.ADD_USER}>
            Add User
          </Button>
          <Button color='inherit' component={StyledLink} onClick={logOut}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

export default NavBar
