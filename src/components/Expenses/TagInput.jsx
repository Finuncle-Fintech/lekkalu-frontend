import React, { useState, useContext } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { preventPropagationOnEnter } from './utils';
import { Context } from 'provider/Provider';

const TagInput = ({myTags, setTags}) => {
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);
  const { tags } = useContext(Context);

  function isInputValid(input) {
    const regex = /^[\d\s]+$/;
    return regex.test(input) || input === "";
  }

  const handleKeyDown = (event) => {
    preventPropagationOnEnter(event);

    if (myTags.includes(inputValue.trim()) || !isInputValid(inputValue)) {
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }

    if (event.key === 'Enter' && inputValue.trim()) {
      setTags([...myTags, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div>
      <Autocomplete
        multiple
        options={tags}
        value={myTags || []}
        onChange={(_, newValue) => {
          setTags(newValue);
        }}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.value === value.value}
        onKeyDown={handleKeyDown}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tag"
            variant="outlined"
            helperText="Select a tag from the list"
            error={isError}
            fullWidth
          />
        )}
      />
    </div>
  );
};

export default TagInput;
