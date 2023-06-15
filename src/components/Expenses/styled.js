import { TableRow } from '@mui/material';
import { styled } from '@mui/system';

export const ModalContainer = styled("div")({
  margin: "35px 0",
  textAlign: "center",
  display:'flex',
  justifyContent:'center',
  gap:'2vw'
});

export const StyledHeaderRow = styled(TableRow)({
  backgroundColor: 'aliceblue',
});
//container charts
export const ContainerCharts = styled('div')({
  display:'grid'
})

//Container expenses
export const ContainerExpenses = styled('div')({
  width:'50vw',
  height:'20vw',
  alignSelf:'end',
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
})

//Budget Container
export const ContainerCardsComponents=styled('div')({
  height:'100vh',
  width:'25vw',
  backgroundColor:'#D9D9D9',
  padding:'1vw'
})
  export const ContainerSingleCard = styled('div')({
    width:'100%',
    height:'13vw',
    background:'white',
    borderRadius:'.8rem'
  })
    export const ContainerTitle = styled('div')({
      borderTopRightRadius:'.8rem',
      borderTopLeftRadius:'.8rem'
    })

// Expense List Components
export const ContainerDataList = styled('div')({
  display:'grid',
  gridTemplateColumns:'repeat(4,1fr)',
  borderBottom:'1px solid black',
  placeItems:'center'
})