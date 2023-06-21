import { TableRow } from '@mui/material';
import { styled } from '@mui/system';

export const ModalContainer = styled("div")({
  margin: "35px 0",
  textAlign: "center",
  display:'flex',
  justifyContent:'center',
  flexDirection:'column',
  alignItems:'center',
  gap:'2vw',
  paddingLeft:'6.5vw',
  paddingRight:'6.5vw',
});

export const StyledHeaderRow = styled(TableRow)({
  backgroundColor: 'aliceblue',
});

//container left data of the layout on expenses
export const ContainerDataChartExpenses = styled('div')({
  display:'flex',
  flexDirection:'column',
  gap:'2vw',
  justifyContent:'center',
  alignItems:'center'
})

//container charts
export const ContainerCharts = styled('div')({
  display:'grid',
  gridTemplateColumns:'repeat(2,1fr)',
  gap:'2vw'
})

//Container expenses
export const ContainerExpenses = styled('div')({
  width:'60vw',
  height:'20vw',
  overflow:'scroll',
  overflowX:'hidden',
  '&::-webkit-scrollbar': {
      backgroundColor:'transparent',
      position:'absolute',
      width:'.4vw',
    },
  '&::-webkit-scrollbar-thumb': {
    background: '#C1C1C1', 
    borderRadius: '1rem',
  },
})
export const ContainerExpensesHeader = styled('div')({
  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  backgroundColor:'#62D4E3',
  height:'2.5vw',
  position:'sticky',
  top:'0px',
  zIndex:'5'
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
  placeItems:'center'
})