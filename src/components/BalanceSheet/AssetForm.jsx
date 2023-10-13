import React, { useState, useEffect, useContext } from 'react'
import { Context } from 'provider/Provider'
import Backdrop from '@mui/material/Backdrop'

import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, TextField, Button, Typography, MenuItem } from '@mui/material'
import jwt_decode from 'jwt-decode'
import Loading from './Loading'

function monthOrYearToSeconds(number, isMonth) {
  const secondsInMinute = 60
  const minutesInHour = 60
  const hoursInDay = 24
  const daysInMonth = 30.44 // Average number of days in a month
  const daysInYear = 365.25 // Average number of days in a year

  if (isMonth) {
    // Convert the month number to seconds
    return number * secondsInMinute * minutesInHour * hoursInDay * daysInMonth
  } else {
    // Convert the year number to seconds
    return number * secondsInMinute * minutesInHour * hoursInDay * daysInYear
  }
}
export default function SimpleBackdrop(props) {
  const [open, setOpen] = React.useState(false)
  const [year, setYear] = React.useState('0')
  const [month, setMonth] = React.useState('1')
  const [formData, setFormData] = useState({
    name: '',
    purchase_value: '',
    sell_value: '',
    purchase_date: '',
    sell_date: '',
    depreciation_percent: '',
    depreciation_frequency: '',
    init_dep: '',
    market_value: '0',
    user: '',
    type: '1',
  })

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }))

  const years = Array.from({ length: 41 }, (_, index) => ({
    value: index,
    label: index,
  }))

  const { addAssetRequest, editAssetRequest, fetchAssetById, authToken } = useContext(Context)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }
  const handleMonthChange = (event) => {
    setMonth(event.target.value)
  }

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwt_decode(authToken)
      const userId = decodedToken.user_id
      setFormData({
        ...formData,
        user: userId,
      })
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (props.title === 'Edit') {
        try {
          const assetData = await fetchAssetById(props.id)

          setFormData({
            ...formData,
            name: assetData.name,
            purchase_value: assetData.purchase_value,
            sell_value: assetData.sell_value || '',
            purchase_date: assetData.purchase_date,
            sell_date: assetData.sell_date || '',
            depreciation_percent: assetData.depreciation_percent,
            depreciation_frequency: assetData.depreciation_frequency,
            market_value: assetData.market_value,
            user: assetData.user,
            type: assetData.type,
          })
          setOpen(false)
        } catch (error) {
          console.error('Error fetching asset data:', error)
          setOpen(false)
        }
      }
    }

    fetchData()
  }, [props.id, props.title])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setOpen(true)

    const filteredData = {}

    for (const key in formData) {
      if (formData[key] !== '') {
        filteredData[key] = formData[key]
      }
    }

    if (props.title === 'Add') {
      try {
        let second = monthOrYearToSeconds(year, false)
        second += monthOrYearToSeconds(month, true)
        filteredData.depreciation_frequency = second
        await addAssetRequest(filteredData)
        setOpen(false)
        props.setForm(false)
        props.handleRequestForm()
      } catch (error) {
        console.error('Error adding asset:', error)
        setOpen(false)
      }
    } else if (props.title === 'Edit') {
      try {
        await editAssetRequest(props.id, filteredData)
        setOpen(false)
        props.handleRequestForm()
      } catch (error) {
        console.error('Error editing asset:', error)
        setOpen(false)
      }
    }
  }

  const handleBoxClick = (event) => {
    event.stopPropagation()
  }

  return (
    <div>
      {open && <Loading open={open} />}
      <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={props.showForm} onClick={props.handleRequestForm}>
        <Box
          sx={{
            width: '30em',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '95%',
            overflowY: 'auto',
            borderRadius: '10px',
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
            <IconButton onClick={props.handleRequestForm} sx={{ margin: '15px 30px 15px 15px' }}>
              <CloseIcon />
            </IconButton>
          </Box>{' '}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>{props.title} Asset</Typography>
          </Box>
          <Box sx={{ padding: '1rem 5rem 5rem 5rem' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                sx={{ margin: '1em 0 ' }}
              />
              <TextField
                label='Purchase Value'
                name='purchase_value'
                type='number'
                value={formData.purchase_value}
                onChange={handleChange}
                required
                fullWidth
                sx={{ margin: '1em 0 ' }}
              />

              <TextField
                label='Sell Value'
                name='sell_value'
                type='number'
                value={formData.sell_value}
                onChange={handleChange}
                // required
                fullWidth
                sx={{ margin: '1em 0 ' }}
              />
              <TextField
                label='Purchase Date'
                name='purchase_date'
                type='date'
                value={formData.purchase_date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ margin: '1em 0 ' }}
                InputProps={{
                  sx: { height: '56px' },
                }}
              />
              <TextField
                label='Sell Date'
                name='sell_date'
                type='date'
                value={formData.sell_date}
                onChange={handleChange}
                fullWidth
                // required
                height='50px'
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ margin: '1em 0 ' }}
                InputProps={{
                  sx: { height: '56px' },
                }}
              />
              <Typography variant='subtitle2' sx={{ color: 'black' }}>
                Depreciation Frequency
              </Typography>
              <TextField
                label='Select Month'
                name='month'
                select
                value={month}
                onChange={handleMonthChange}
                required
                sx={{ margin: '1em 0 ', width: '45%', marginRight: '10%' }}
              >
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label='Select Year'
                name='year'
                select
                value={year}
                onChange={handleYearChange}
                required
                sx={{ margin: '1em 0 ', width: '45%' }}
              >
                {years.map((year) => (
                  <MenuItem key={year.value} value={year.value}>
                    {year.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label='Initial Depreciation'
                name='init_dep'
                type='number'
                value={formData.init_dep}
                onChange={handleChange}
                fullWidth
                required
                sx={{ margin: '1em 0 ' }}
              />

              <TextField
                label='Depreciation Percent'
                name='depreciation_percent'
                type='number'
                value={formData.depreciation_percent}
                onChange={handleChange}
                fullWidth
                required
                sx={{ margin: '1em 0 ' }}
              />

              <Button variant='contained' type='submit' color='primary' fullWidth>
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Backdrop>
    </div>
  )
}
