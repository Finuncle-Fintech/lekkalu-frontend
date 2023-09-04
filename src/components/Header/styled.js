import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const HeaderButton = styled(Button)({
  color: "white",
  "&:hover": { color: "white" },
  "&:active": { color: "white" },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export const DropDownButton = styled('button')({
  border:'none', 
  backgroundColor:'transparent',
  color:'white',
  fontSize:'bold',
})
