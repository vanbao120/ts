import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentAction } from '../studentSlice'
import { styled } from '@mui/material/styles';
import StudentTable from '../components/StudentTable';
import { selectCity, selectCityMap } from 'features/city/citySlice';
import StudentFilter from '../components/StudentFilter';
import { ListParams, Students } from 'models';
import studentsApi from 'api/studentApi';
import { Link } from 'react-router-dom';

const ListPage = () => {
  const dispatch = useAppDispatch()
  const studentList = useAppSelector(selectStudentList)
  const pagination = useAppSelector(selectStudentPagination)
  const filter = useAppSelector(selectStudentFilter)
  const loading = useAppSelector(selectStudentLoading)
  const cityMap = useAppSelector(selectCityMap)
  const cityList = useAppSelector(selectCity)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(studentAction.setFilter({
      ...filter,
      _page: value
    }))
  };

  const handleSearch = (newFilter: ListParams) => {
    dispatch(studentAction.setFilterWithDebounce(newFilter))
  }

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentAction.setFilterWithDebounce(newFilter))
  }

  const handleRemove = async (student: Students) => {
    try {
      await studentsApi.remove(student.id ?? '')
      dispatch(studentAction.setFilter({...filter}))
    } catch (err) {
      console.log('Failed', err);
    }
  }

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

  const LoadingProgress = styled(LinearProgress)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%'
  }))

  return (
    <Box sx={{ position: 'relative', paddingTop: 1 }}>
      {loading && <LoadingProgress />}
      <BoxContainer>
        <Typography variant="h4">Student</Typography>
        <Link to="/admin/students/add" style={{textDecoration: 'none'}}>
        <Button variant="contained" color="primary" >
          Add new student
        </Button>
        </Link>
      </BoxContainer>
      {/* Filter */}
      <Box mb={3}>
        <StudentFilter filter={filter} cityList={cityList} onSearchChange={handleSearch} onFilterChange={handleFilterChange} />
      </Box>
      <StudentTable studentList={studentList} cityMap={cityMap} onRemove={handleRemove} />
      <Box display='flex' justifyContent='center'>
        <Pagination count={Math.ceil(pagination._totalRows / pagination._limit)} page={pagination?._page} onChange={handleChange} sx={{ marginTop: 2 }} color="primary" />
      </Box>
    </Box>
  )
}

export default ListPage
