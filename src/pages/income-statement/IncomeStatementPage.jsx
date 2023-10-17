import React, { useContext, useEffect } from 'react'
import { Typography, Container, Grid, Box, Tabs, Tab } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Context } from '@/provider/Provider'
import IncomePercentage from '../../assets/income-percentange.svg'
import IncomeExpenseTable from './IncomeExpenseTable'
import './index.css'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const IncomeStatementPage = () => {
  const {
    fetchIncomeStatement,
    incomeStatement,
    addIncomeSource,
    updateIncomeSourceById,
    deleteIncomeSourceById,
    addIncomeExpense,
    updateIncomeExpenseById,
    deleteIncomeExpenseById,
  } = useContext(Context)
  const [value, setValue] = React.useState(0)

  const tabStyle = {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#ffffff',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    '&.Mui-selected': {
      backgroundColor: '#ffffff',
    },
  }

  const tabPanelStyle = {
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
  }
  const tabsStyle = {
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    backgroundColor: 'transparent',
    '.css-jpln7h-MuiTabs-scroller': {
      backgroundColor: 'transparent',
    },
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // Initialize variables to store the totals for each type
  let personalTotal = 0
  let loanRepaymentTotal = 0
  let investmentTotal = 0

  // Iterate through the array of transactions
  incomeStatement.expenses.forEach((transaction) => {
    // Check the type of the transaction and add its value to the corresponding total
    switch (transaction.type) {
      case 'Personal':
        personalTotal += transaction.value
        break
      case 'Loan_repayment':
        loanRepaymentTotal += transaction.value
        break
      case 'Investment':
        investmentTotal += transaction.value
        break
      // You can add additional cases for other types if needed
    }
  })

  // Calculate the percentages
  const personalPercentage = (personalTotal / 179000) * 100
  const loanRepaymentPercentage = (loanRepaymentTotal / 179000) * 100
  const investmentPercentage = (investmentTotal / 179000) * 100

  // Step 1: Calculate the sum of all "Salary" type values
  const salaryValues = incomeStatement.income.filter((item) => item.type === 'Salary')
  const sumOfSalaryValues = salaryValues.reduce((total, item) => total + item.value, 0)

  // Step 2: Calculate the percentage of "Salary" data compared to the total value
  const totalValue = incomeStatement.income.reduce((total, item) => total + item.value, 0)
  const salaryPercentage = (sumOfSalaryValues / totalValue) * 100 + '%'

  useEffect(() => {
    fetchIncomeStatement()
  }, [])

  return (
    <div style={{ backgroundColor: '#1976D2', paddingBottom: '30px' }}>
      <Container sx={{ paddingTop: '50px' }}>
        <Typography className='header-text' component='div' variant='h5'>
          Income statement
        </Typography>
        <Grid container spacing={{ xs: 1, sm: 1, md: 3 }} style={{ marginBottom: '50px', marginTop: '0' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                display: 'flex',
                '.css-4t2aqu-MuiPaper-root-MuiCard-root': {
                  borderRadius: '12px',
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', paddingBottom: '16px !important  ' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <img src={IncomePercentage} width={64} alt='' />
                    <div>
                      <Typography
                        component='div'
                        variant='h5'
                        sx={{
                          color: 'rgba(0, 0, 0, 0.75)',
                          fontSize: '34px',
                          fontWeight: 500,
                          lineHeight: '40px',
                        }}
                      >
                        {!Number.isNaN(salaryPercentage) ? salaryPercentage : 0}
                      </Typography>
                      <Typography variant='subtitle1' color='text.secondary' component='div' className='sub-text'>
                        Salary
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ display: 'flex' }}>
              <Box
                sx={{
                  display: 'flex',
                  borderRadius: '12px',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flex: '1 0 auto', paddingBottom: '16px !important  ' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <img src={IncomePercentage} width={64} alt='' />
                    <div>
                      <Typography
                        component='div'
                        variant='h5'
                        sx={{
                          color: 'rgba(0, 0, 0, 0.75)',
                          fontSize: '34px',
                          fontWeight: 500,
                          lineHeight: '40px',
                        }}
                      >
                        {!Number.isNaN(personalPercentage) ? `${personalPercentage.toFixed(2)}%` : 0}
                      </Typography>
                      <Typography variant='subtitle1' color='text.secondary' component='div' className='sub-text'>
                        Personal
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ display: 'flex' }}>
              <Box
                sx={{
                  display: 'flex',
                  borderRadius: '12px',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flex: '1 0 auto', paddingBottom: '16px !important  ' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <img src={IncomePercentage} width={64} alt='' />
                    <div>
                      <Typography
                        component='div'
                        variant='h5'
                        sx={{
                          color: 'rgba(0, 0, 0, 0.75)',
                          fontSize: '34px',
                          fontWeight: 500,
                          lineHeight: '40px',
                        }}
                      >
                        {!Number.isNaN(loanRepaymentPercentage) ? `${loanRepaymentPercentage.toFixed(2)}%` : 0}
                      </Typography>
                      <Typography variant='subtitle1' color='text.secondary' component='div' className='sub-text'>
                        Loan_repayment
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ display: 'flex' }}>
              <Box
                sx={{
                  display: 'flex',
                  borderRadius: '12px',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flex: '1 0 auto', paddingBottom: '16px !important' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <img src={IncomePercentage} width={64} alt='' />
                    <div>
                      <Typography
                        component='div'
                        variant='h5'
                        sx={{
                          color: 'rgba(0, 0, 0, 0.75)',
                          fontSize: '34px',
                          fontWeight: 500,
                          lineHeight: '40px',
                        }}
                      >
                        {!Number.isNaN(investmentPercentage) ? `${investmentPercentage.toFixed(2)}%` : 0}
                      </Typography>
                      <Typography variant='subtitle1' color='text.secondary' component='div' className='sub-text'>
                        Investment
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Tabs sx={tabsStyle} value={value} variant='fullWidth' onChange={handleChange} aria-label='basic tabs example'>
          <Tab sx={tabStyle} label='Income' {...a11yProps(0)} />
          <Tab sx={tabStyle} label='Expense' {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel style={tabPanelStyle} className='custom-tab-container' value={value} index={0}>
          <IncomeExpenseTable
            incomeStatement={incomeStatement.income}
            addfield={addIncomeSource}
            updateField={updateIncomeSourceById}
            deleteField={deleteIncomeSourceById}
            incomeTable
          />
        </CustomTabPanel>
        <CustomTabPanel style={tabPanelStyle} className='custom-tab-container' value={value} index={1}>
          <IncomeExpenseTable
            incomeStatement={incomeStatement.expenses}
            addfield={addIncomeExpense}
            updateField={updateIncomeExpenseById}
            deleteField={deleteIncomeExpenseById}
          />
        </CustomTabPanel>
      </Container>
    </div>
  )
}

export default IncomeStatementPage
