import React, { useCallback, useState } from 'react'
import { Avatar, Box, CircularProgress } from '@mui/material'
import styled from 'styled-components'

const AvatarContainer = styled(Box)`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: relative;
`
const PlaceholderAvatar = styled(Box)`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`

function UserAvatar ({ user, avatarSize = 100 }) {
  const [avatarLoading, setAvatarLoading] = useState(true)
  const disableAvatarLoading = useCallback(() => setAvatarLoading(false), [])

  return (
    <AvatarContainer size={avatarSize}>
      {avatarLoading && (
        <PlaceholderAvatar size={avatarSize}>
          <CircularProgress size={avatarSize / 2.5} />
        </PlaceholderAvatar>
      )}
      <Avatar
        alt={`${user.first_name} ${user.last_name}`}
        src={user.avatar}
        sx={{
          width: avatarSize,
          height: avatarSize,
          display: avatarLoading ? 'none' : 'block'
        }}
        onLoad={disableAvatarLoading}
        onError={disableAvatarLoading}
      />
    </AvatarContainer>
  )
}

export default UserAvatar
