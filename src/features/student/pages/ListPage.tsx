import { Box, Button, Pagination, Typography } from '@mui/material'
import { useAppDispatch } from 'app/hooks'
import React, { useEffect } from 'react'
import { selectStudentFilter, selectStudentList, selectStudentPagination, studentAction } from '../studentSlice'
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import StudentTable from '../components/StudentTable';

const ListPage = () => {
  const dispatch = useAppDispatch()
  const studentList = useSelector(selectStudentList)
  const pagination = useSelector(selectStudentPagination)
  const filter = useSelector(selectStudentFilter)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(studentAction.setFilter({
      ...filter,
      _page: value
    }))
  };

  useEffect(() => {
    dispatch(studentAction.fetchStudentList(filter))
  }, [dispatch, filter])

  const BoxContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  }))

  return (
    <Box>
      <BoxContainer>
        <Typography variant="h4">Student</Typography>
        <Button variant="contained" color="primary" >
          Add new student
        </Button>
      </BoxContainer>
      <StudentTable studentList={studentList} />
      <Box display='flex' justifyContent='center'>
        <Pagination count={Math.ceil(pagination._totalRows / pagination._limit)} page={pagination?._page} onChange={handleChange} sx={{ marginTop: 2 }} color="primary" />
      </Box>
    </Box>
  )
}

export default ListPage