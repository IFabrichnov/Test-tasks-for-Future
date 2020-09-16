import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../App.css'


const Filter = ({onSearch}) => {
  const [value, setValue] = useState('');

  const inputHandler = e => {
    setValue(e.target.value);
  };

  return (
    <div className='filter'>

      <TextField onChange={inputHandler} value={value} type="text"
                 id="outlined-secondary"
                 label="Поиск человека"
                 variant="outlined"
                 color="secondary"
      />

      <Button
        onClick={() => onSearch(value)}
        variant="outlined"
        color="primary"
      >
        Найти
      </Button>
    </div>
  )
};

export default Filter;