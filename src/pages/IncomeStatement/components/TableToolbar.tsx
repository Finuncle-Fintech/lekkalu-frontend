import {
  GridDeleteIcon,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import React, { useState } from 'react'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import When from '@/components/When/When'

type Props = {
  isIncomeTable: boolean
}

// @TODO: Update from mui to shadcn/ui components
export default function TableToolbar({ isIncomeTable }: Props) {
  const isMobile = window.innerWidth <= 768

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter size='small' />

      <When
        truthy={isMobile}
        fallback={
          <div>
            <IconButton
              // disabled={selectedRows?.length === 0}
              onClick={() => {
                // setRows((r) => r.filter((x) => !selectedRows.includes(x.id)))
              }}
              className='table-button'
              sx={{
                color: '#344054',
                fontSize: '14px',
                fontWeight: '500',
                '&:hover': { borderRadius: '12px' },
              }}
            >
              <DeleteIcon
                className='table-button-icon'
                sx={{
                  color: '#344054',
                  width: 20,
                  height: 20,
                  marginRight: '4px',
                }}
              />
              Delete
            </IconButton>
            <GridToolbarFilterButton className='table-button' sx={{ color: '#344054', margin: '10px' }} />
            <GridToolbarExport
              sx={{
                border: '1px solid #D0D5DD',
                borderRadius: '8px',
                color: '#344054',
                fontSize: '14px',
                fontWeight: 500,
                padding: '10px',
                margin: '10px',
                lineHeight: '20px',
                'span svg': {
                  width: '20px',
                  height: '20px',
                },
              }}
              className='table-button table-export-icon'
            />
            <Button
              color='primary'
              sx={{
                borderRadius: '8px',
                border: '1px solid #0070FF',
                background: '#0070FF',
                boxShadow: '0px 0.96159px 1.92319px 0px rgba(16, 24, 40, 0.05)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '20px',
                padding: '10px',
                marginLeft: '10px',
                '&:hover': { backgroundColor: '#0070FF' },
              }}
              className='table-button'
              startIcon={<AddIcon className='table-button-icon' sx={{ color: '#ffffff', width: 20, height: 20 }} />}
              // onClick={addRowButton}
            >
              Add {isIncomeTable ? 'Income' : 'Expense'}
            </Button>
          </div>
        }
      >
        <IconButton
          aria-label='more'
          id='long-button'
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <IconButton
              onClick={() => {
                // setRows((r) => r.filter((x) => !selectedRows.includes(x.id)))
              }}
              className='table-button'
              sx={{
                color: '#344054',
                fontSize: '14px',
                fontWeight: '500',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <GridDeleteIcon
                className='table-button-icon'
                sx={{
                  color: '#344054',
                  width: 20,
                  height: 20,
                  marginRight: '4px',
                }}
              />
              DELETE
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <GridToolbarFilterButton
              className='menu-item-button table-button'
              sx={{
                color: '#344054',
                margin: '10px',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <GridToolbarExport
              sx={{
                color: '#344054',
                margin: '10px',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              className='table-button table-export-icon'
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button
              color='primary'
              sx={{
                color: '#344054',
                margin: '10px',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              className='table-button'
              startIcon={<AddIcon className='table-button-icon' sx={{ color: '#000000', width: 20, height: 20 }} />}
              // onClick={addRowButton}
            >
              Add {isIncomeTable ? 'Income' : 'Expense'}
            </Button>
          </MenuItem>
        </Menu>
      </When>
    </GridToolbarContainer>
  )
}
