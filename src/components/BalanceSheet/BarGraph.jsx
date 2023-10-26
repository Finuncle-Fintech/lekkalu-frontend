import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton } from '@mui/material'
import BarChart from './BarChart'

export default function SimpleBackdrop(props) {
  const [boxWidth, setBoxWidth] = useState('40vw')

  useEffect(() => {
    const updateBoxWidth = () => {
      if (window.innerWidth <= 768) {
        setBoxWidth('80vw')
      } else if (window.innerWidth <= 1000) {
        setBoxWidth('70vw')
      } else if (window.innerWidth <= 480) {
        setBoxWidth('90vw')
      } else {
        setBoxWidth('55vw')
      }
    }
    window.addEventListener('resize', updateBoxWidth)
    updateBoxWidth()
    return () => {
      window.removeEventListener('resize', updateBoxWidth)
    }
  }, [])

  const handleBoxClick = (event) => {
    event.stopPropagation()
  }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.barGraphIsOpen}
        onClick={props.setBarGraphIsOpen}
      >
        <Box
          sx={{
            width: boxWidth,
            height: '70vh',
            backgroundColor: 'white',
            borderRadius: '40px',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={handleBoxClick}
        >
          <Box
            sx={{
              width: '100%',
              height: '70px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton onClick={props.setBarGraphIsOpen} sx={{ margin: '15px 30px 15px 15px' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <BarChart data={props.dataLiability} />
        </Box>
      </Backdrop>
    </div>
  )
}
