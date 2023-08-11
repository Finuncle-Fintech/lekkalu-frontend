import { TableRow } from '@mui/material';
import { styled } from '@mui/system';

export const ModalContainer = styled("div")({
 display:'flex',
 gap:'3vw'
});

export const StyledHeaderRow = styled(TableRow)({
  backgroundColor: 'aliceblue',
});

//container left data of the layout on expenses
export const ContainerExpensesData = styled('div')({
  display:'flex',
  flexDirection:'column',
  gap:'2vw',
  justifyContent:'center',
  alignItems:'center',
  width:'100%'
})


//Budget Container
export const ContainerCardsComponents=styled('div')({
  height:'100vh',
  width:'25vw',
  backgroundColor:'#D9D9D9',
  padding:'1vw'
})


// Expense List Components
export const ContainerDataList = styled('div')({
  display:'grid',
  gridTemplateColumns:'repeat(4,1fr)',
  borderBottom:'1px solid black',
  placeItems:'center',
})