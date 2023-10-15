import { useContext, useState } from 'react'
import axios from 'axios'
import CalculatorSIP from '@/components/CalculatorSIP/CalculatorSIP'
import Summary from '@/components/CalculatorSIP/Summary'
import { handleShare, isObjectEmpty } from '@/components/EMI_Components/utils'
import { Context } from '@/provider/Provider'

export default function SIPCalculator() {
  const { authToken } = useContext(Context)
  const [summary, setSummary] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
      await axios.post(`${process.env.REACT_APP_API}expenses/`, summary, {
        headers,
      })
    } catch (error) {
      console.error('Error:', error)
      alert('Error occurred during API call.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (data) => {
    setIsCopied(true)
    handleShare(data)
    setTimeout(() => setIsCopied(false), 3000)
  }

  return (
    <section className='container h-100'>
      <div className='d-flex align-items-center justify-content-between'>
        {!isObjectEmpty(summary) ? (
          <>
            <button className='save' onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              className='save'
              onClick={() =>
                handleCopy({
                  monthlyAmount: summary?.monthlyAmount,
                  durationInvestment: summary?.durationInvestment,
                  rateReturn: summary?.rateReturn,
                })
              }
            >
              {isCopied ? 'Copied!' : 'Share'}
            </button>
          </>
        ) : null}
      </div>

      <div className='md-p-5 d-flex flex-column flex-md-row gap-4'>
        <div className='d-flex flex-column'>
          <div className='d-flex flex-column text-center'>
            <h2 className='fs-2'>SIP Calculator</h2>
            <p>Calculate returns on your SIP investments.</p>
          </div>
          <CalculatorSIP setSummary={setSummary} />
        </div>

        <Summary summary={summary} />
      </div>
    </section>
  )
}
