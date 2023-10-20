/* eslint-disable */

import React, { useState, useEffect, useContext } from 'react'
import Backdrop from '@mui/material/Backdrop'

import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, TextField, Button, Typography } from '@mui/material'
import jwt_decode from 'jwt-decode'
import { Context } from '@/provider/Provider'
import Loading from './Loading'

export default function LiabilitiesForm(props) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = useState({
    name: '',
    balance: '',
    principal: '',
    disbursement_date: '',
    emi_day: '',
    emi: '',
    tenure: '',
    interest_rate: '',
    closure_charges: '',
  })

  const { addLiabilityRequest, editLiabilityRequest, fetchLiabilityById, authToken } = useContext(Context)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
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
          const LiabilityData = await fetchLiabilityById(props.id)
          setFormData({
            ...formData,
            name: LiabilityData.name,
            balance: LiabilityData.balance || '',
            principal: LiabilityData.principal || '',
            disbursement_date: LiabilityData.disbursement_date || '',
            emi_day: LiabilityData.emi_day || '',
            emi: LiabilityData.emi || '',
            tenure: LiabilityData.tenure || '',
            interest_rate: LiabilityData.interest_rate || '',
            closure_charges: LiabilityData.closure_charges || '',
          })
          setOpen(false)
        } catch (error) {
          console.error('Error fetching Liability data:', error)
          setOpen(false)
        }
      }
    }

    fetchData()
  }, [props.id, props.title])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setOpen(true)

    if (props.title === 'Add') {
      try {
        await addLiabilityRequest(formData)
        setOpen(false)
        props.setForm(false)
        props.handleRequestForm()
      } catch (error) {
        console.error('Error adding Liability:', error)
        setOpen(false)
      }
    } else if (props.title === 'Edit') {
      try {
        await editLiabilityRequest(props.id, formData)
        setOpen(false)
        props.handleRequestForm()
      } catch (error) {
        console.error('Error editing Liability:', error)
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
            <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>
              {props.title} Liability
            </Typography>
          </Box>
          <Box sx={{ padding: '1rem 5rem 5rem 5rem' }}>
            <form onSubmit={handleSubmit}>
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
