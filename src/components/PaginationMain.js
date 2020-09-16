import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import '../App.css';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from "@material-ui/core/TableFooter";


//material ui
const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginationMain = ({getPageCount, paginate, currentPage}) => {
  //material ui
  const classes = useStyles();

  return (
    <div className='center'>
      <TableFooter>
        <TableRow>
          <div className={classes.root}>
            <Typography>Page: {currentPage}</Typography>
            <Pagination count={getPageCount} page={currentPage} onChange={paginate}/>
          </div>
        </TableRow>
      </TableFooter>
    </div>
  )
};

export default PaginationMain;