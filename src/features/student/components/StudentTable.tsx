import { City, Students } from 'models'
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import { capitalizeString, getMarkColor } from 'utils'
import { TransitionProps } from '@mui/material/transitions';
import { useHistory, useRouteMatch } from 'react-router-dom';

type Props = {
  studentList: Students[]
  onEdit?: (student: Students) => void
  onRemove?: (student: Students) => void
  cityMap: {
    [key: string]: City
  }
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentTable({ studentList, onEdit, onRemove, cityMap }: Props) {
  const history = useHistory()
  const match = useRouteMatch()
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Students>()

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Students) => {
    setSelectedStudent(student);
    setOpen(true);
  }

  const handleRemoveConfirm = (student: Students) => {
    onRemove?.(student)
    setOpen(false);
  }

  const handleEditStudent = async (student: Students) => {
    history.push(`${match.path}/${student.id}`)
  }

  const ButtonAction = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(1)
  }))

  return (
    <>
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
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)}>{student.mark}</Box></TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <ButtonAction size="small" color='primary' onClick={() => handleEditStudent(student)}>Edit</ButtonAction>
                  <Button size="small" color="secondary" onClick={() => handleRemoveClick(student)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Remove a student??"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to remove this student name '{selectedStudent?.name}' <br/>
            This action will not be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">Cancel</Button>
          <Button onClick={() => handleRemoveConfirm(selectedStudent as Students)} color="secondary" variant="contained">Remove</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
