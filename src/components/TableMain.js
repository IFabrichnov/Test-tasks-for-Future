import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

//material ui styles
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TableMain = ({items, columns, rowSelect, sort, sortClick}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(col => {
              return (
                <TableCell onClick={sortClick.bind(null, col.name)} data-sort={col.name}>
                  {col.name}
                  {sort.sortField === col.name ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item =>
            <TableRow key={item.name} onClick={rowSelect.bind(null, item)}>{columns.map(column => <TableCell
              component="th" scope="row">{item[column.field]}</TableCell>)}</TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default TableMain;
