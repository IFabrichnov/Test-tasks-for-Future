import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    maxWidth: 650
  },
});

const UserInfo = ({item}) => {
  const classes = useStyles();

  return (
    <div className='center'>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Выбран пользователь </TableCell>
              <TableCell align="right">{(item.firstName + ' ' + item.lastName)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Описание:</TableCell>
              <TableCell align="right"><textarea defaultValue={item.description}/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Адрес проживания:</TableCell>
              <TableCell align="right"><b>{item.address.streetAddress}</b></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Город:</TableCell>
              <TableCell align="right"><b>{item.address.city}</b></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Провинция/штат:</TableCell>
              <TableCell align="right"><b>{item.address.state}</b></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Индекс:</TableCell>
              <TableCell align="right"><b>{item.address.zip}</b></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default UserInfo;