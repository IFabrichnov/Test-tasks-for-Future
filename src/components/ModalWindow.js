import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      height: '7ch'
    },
  },
}));

const ModalWindow = ({changeInput, submitInput}) => {
  const classes = useStyles();

  return (
    <div>
      <form onSubmit={submitInput} className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-secondary"
          label="id"
          variant="outlined"
          color="secondary"
          type="text"
          name="id"
          onChange={changeInput}
          required
        />

        <TextField
          id="outlined-secondary"
          label="First Name"
          variant="outlined"
          color="secondary"
          type="text"
          name="firstName"
          onChange={changeInput}
          required
        />

        <TextField
          id="outlined-secondary"
          label="Last Name"
          variant="outlined"
          color="secondary"
          type="text"
          name="lastName"
          onChange={changeInput}
          required
        />

        <TextField
          id="outlined-secondary"
          label="Email"
          variant="outlined"
          color="secondary"
          type="text"
          name="email"
          onChange={changeInput}
          required
        />

        <TextField
          id="outlined-secondary"
          label="Phone"
          variant="outlined"
          color="secondary"
          type="text"
          name="phone"
          onChange={changeInput}
          required
        />

        <Button
          type='submit'
          className='button-modal'
          variant="outlined"
          color="primary"
        >
          Добавить
        </Button>
      </form>
    </div>
  )
};

export default ModalWindow;