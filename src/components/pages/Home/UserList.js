import { Box, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../router/routes'
import UserAvatar from '../../Avatar'
import styled from 'styled-components'

const AvatarContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: 10px;
`
function UserList ({ users }) {
  return (
    <List>
      {users.map((user) => (
        <ListItem
          key={user.id}
          component={Link}
          to={`${ROUTES.USER}/${user.id}`}
        >
          <AvatarContainer>
            <UserAvatar user={user} avatarSize={40} />
          </AvatarContainer>
          <ListItemText
            primary={`${user.first_name} ${user.last_name}`}
            secondary={user.email}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default UserList
