import React from 'react';
import TextField from '@mui/material/TextField';
import s from './style.module.css';

function SearchBar({searchTerm, onSearch}) {

    const handleChange = (event) => {
        onSearch(event.target.value);
    }

  return (
    <div className={s.searchBar}>
        <TextField
        className={s.searchBar}
        label="Поиск"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        />
    </div>
  );
}

export default SearchBar;