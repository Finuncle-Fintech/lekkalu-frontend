import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import { MenuItem } from '@mui/material'
import { useNavigate } from 'react-router'

function CalculatorMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLinkClick = (link) => {
    setAnchorEl(null)
    if (link) {
      navigate(link)
    }
  }
  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          width: '51px',
          height: '51px',
          margin: '10px',
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <img
          width='25'
          height='30'
          src='https://img.icons8.com/material-outlined/24/calculator--v2.png'
          alt='calculator--v2'
        />
      </IconButton>
      <Menu
        id='calculator-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleLinkClick()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleLinkClick('/SIPCalculator')}>SIP</MenuItem>
        <MenuItem onClick={() => handleLinkClick('/CAGRCalculator')}>CAGR</MenuItem>
        <MenuItem onClick={() => handleLinkClick('/loan_emi_calculator')}>EMI</MenuItem>
      </Menu>
    </>
  )
}

export default CalculatorMenu
