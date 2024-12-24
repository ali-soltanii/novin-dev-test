import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Container, Typography, Pagination, Box } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'

import UserList from './UserList'

import { getUsers } from '../../../api/'
import EmptyState from '../../EmptyState'
import Loading from '../../Loading'

const StyledContainer = styled(Container)`
  margin-top: 30px;
`

function Home () {
  const { pageNumber } = useParams()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const page = useMemo(() => parseInt(pageNumber) || 1, [pageNumber])

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await getUsers(page)
        setUsers(response.data.data)
        setTotalPages(response.data.total_pages)
      } catch (error) {
        enqueueSnackbar('Failed to fetch users. Please try again later.', {
          variant: 'error'
        })
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handlePageChange = useCallback(
    (event, value) => {
      navigate(`/${value}`)
    },
    [navigate]
  )

  const render = () => {
    if (loading) {
      return <Loading />
    }
    if (!users.length) {
      return <EmptyState description='No users found.' />
    }
    return <UserList users={users} />
  }
  return (
    <StyledContainer maxWidth='md'>
      <Typography variant='h4' gutterBottom>
        Users List
      </Typography>
      {render()}
      <Box display='flex' justifyContent='center' mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </StyledContainer>
  )
}

export default Home
