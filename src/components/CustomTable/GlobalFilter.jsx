import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter)

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 500)

  return (
    <div>
      {/* <TextField
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        sizing="sm"
      /> */}
      <TextField
        // sx={{ padding: '4px 0 5px !important' }}
        size='small'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default GlobalFilter
