import React, { useState } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { preventPropagationOnEnter } from './utils';

const TagContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '8px',
});

const TagInput = ({tags, setTags}) => {
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);
  console.log(tags);

  function isInputValid(input) {
    const regex = /^[\d\s]+$/;
    return regex.test(input) || input === "";
  }

  const handleKeyDown = (event) => {
    preventPropagationOnEnter(event);

    if (tags.includes(inputValue.trim()) || !isInputValid(inputValue)) {
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }

    if (event.key === 'Enter' && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div>
      <TagContainer>
        {Boolean(tags.length) && tags.map((tag) => (
          <Chip key={tag} label={tag} onDelete={() => handleDelete(tag)} />
        ))}
      </TagContainer>
      <TextField
        label="Tag"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        helperText="Tag should be a number, which is unique"
        error={isError}
        fullWidth
      />
    </div>
  );
};

export default TagInput;
