import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Students } from 'models';
import studentsApi from 'api/studentApi';
import StudentForm from '../components/StudentForm';

const AddEditPage = () => {
  const { studentId } = useParams<{ studentId: string }>()
  const isEdit = Boolean(studentId)
  const [student, setStudent] = useState<Students>()

  useEffect(() => {
    if (!studentId) return
      ; (async () => {
        try {
          const data: Students = await studentsApi.getById(studentId)
          setStudent(data)
        } catch (err) {
          console.log(err);
        }
      })()
  }, [])

  const handleStudentSubmit = (formValue: Students) => {

  }

  const initialValue: Students = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student
  } as Students
  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
          <ArrowBackIcon /> Back to student list
        </Typography>
      </Link>
      <Typography variant='h4'>{isEdit ? 'Update student info' : 'Add new student'}</Typography>
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm onSubmit={handleStudentSubmit} initialValue={initialValue}/>
        </Box>
      )}
    </Box>
  )
}

export default AddEditPage