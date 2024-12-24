import React, { useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import styled from 'styled-components'

import Details from './Details'

import { deleteUser } from '../../../api'
import { useSnackbar } from 'notistack'
import Loading from '../../Loading'
import EmptyState from '../../EmptyState'
import { useFetchUser, useNavigateBasedOnReferrer } from '../../../api/hooks'

const StyledContainer = styled(Container)`
  margin-top: 30px;
`

function UserDetail () {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const userId = useMemo(() => parseInt(id) || 1, [id])
  const { enqueueSnackbar } = useSnackbar()
  const goBack = useNavigateBasedOnReferrer()
  const { user } = useFetchUser(userId, setLoading)

  const onDeleteUser = useCallback(
    async (userId) => {
      setLoading(true)
      try {
        await deleteUser(userId)
        enqueueSnackbar(
          'User removed. You will be redirected to the previous page!',
          {
            variant: 'success',
            onClose: goBack
          }
        )
      } catch (error) {
        enqueueSnackbar('Failed to remove the user. Please try again later.', {
          variant: 'error'
        })
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goBack]
  )

  const render = () => {
    if (loading) {
      return <Loading />
    }
    if (!user) {
      return <EmptyState description='User not found.' />
    }
    return <Details user={user} onDeleteUser={onDeleteUser} />
  }
  return <StyledContainer maxWidth='sm'>{render()}</StyledContainer>
}

export default UserDetail
