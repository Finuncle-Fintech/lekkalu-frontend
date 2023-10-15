import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AssetForm from './AssetForm'
import LiabilitiesForm from './LiabilitiesForm'

const options = ['Edit']

const ITEM_HEIGHT = 48

export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isEditClicked, setIsEditClicked] = React.useState(false) // New state to track if "Edit" is clicked

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleEditClick = () => {
    setAnchorEl(null)
    setIsEditClicked(true)
    // handleClose(); // Close the menu
  }

  const handleClose = () => {
    setAnchorEl(null)
    setIsEditClicked(false)
  }

  return (
    <div>
      {isEditClicked ? (
        <>
          {props.title === 'Asset' && (
            <AssetForm showForm={isEditClicked} handleRequestForm={handleClose} title='Edit' id={props.id} />
          )}
          {props.title === 'Liability' && (
            <LiabilitiesForm showForm={isEditClicked} handleRequestForm={handleClose} title='Edit' id={props.id} />
          )}
        </>
      ) : (
        <IconButton
          aria-label='more'
          id='long-button'
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
      )}
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={option === 'Edit' ? handleEditClick : handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
