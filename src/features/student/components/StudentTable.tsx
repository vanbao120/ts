import { Students } from 'models'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = {
  studentList: Students[]
  onEdit?: (student: Students) => void
  onRemove?: (student: Students) => void 
}

export default function StudentTable({ studentList, onEdit, onRemove }: Props) {

  const ButtonAction = styled(Button)(({theme}) => ({
    marginRight: theme.spacing(1)
  }))

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList?.map((student, index) => (
            <TableRow key={student.id} >
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.mark}</TableCell>
              <TableCell>{student.city}</TableCell>
              <TableCell align="right">
                <ButtonAction variant='contained' color='primary' onClick={() => onEdit?.(student)}>Edit</ButtonAction>
                <Button variant="outlined" color="secondary" onClick={() => onRemove?.(student)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
