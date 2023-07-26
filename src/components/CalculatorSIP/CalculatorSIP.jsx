import { Button, TextField } from "@mui/material"
import { useState } from "react"

export default function CalculatorSIP({setSummary}){
    const [ monthlyAmount, setMonthlyAmout ] = useState(false)
    const [ durationInvestment, setDurationInvestment ] = useState(false)
    const [ rateReturn, setRateReturn ] = useState(false)
    const [ error, setError ] = useState(false)
    const inputs = [
        {
            label:'Monthly investment amount (₹):',
            type:'number',
        },
        {
            label:'Duration of the investment:',
            type:'number'
        },{
            label:'Expected annual return (%)',
            type:'number'
        }

    ]

    const handlerCalculate = (e) => {
        e.preventDefault()
        if(!monthlyAmount || !durationInvestment || !rateReturn){
            setError({
                monthlyAmount:!monthlyAmount,
                durationInvestment:!durationInvestment,
                rateReturn:!rateReturn
            })
            setSummary([])
            return
        }
        const value = getFinalValue(monthlyAmount, durationInvestment, rateReturn)
        setSummary(value)
        setError(false)
    }

    return(
        <form action="" style={{
            display:'grid',
            gridTemplateColumns:'repeat(2,1fr)',
            gap:'3vw'
        }}
        onSubmit={handlerCalculate}
        >
            {
                inputs.map((input, i)=>{
                    const conditionalMonthly = input.label.includes('Monthly investment amount')
                    return(
                        <>
                        {
                        input.label.includes('Duration of the investment')?(
                            <div className="d-flex" key={i}>
                                <TextField error={error.durationInvestment} value={durationInvestment} onChange={(e)=>setDurationInvestment(e.target.value)} fullWidth={true} key={i} label={input.label} type={input.type} />
                                <div className="rounded-end p-2 d-flex justify-content-center align-items-center border bg-secondary-subtle">
                                    <span className="fs-6 fw-semibold">Years</span>
                                </div>
                            </div>

                        ):(
                            <TextField error={conditionalMonthly?error.monthlyAmount:error.rateReturn} value={conditionalMonthly?monthlyAmount:rateReturn} onChange={(e)=>{conditionalMonthly?setMonthlyAmout(e.target.value):setRateReturn(e.target.value)}} fullWidth={true} key={i} label={input.label} type={input.type} />
                        )
                        }
                        </>
                        )
                })
            }
            <Button variant="contained" type="submit" color="primary">
                Calculate
            </Button>
        </form>
    )
}

const getFinalValue =  (monthlyAmount, durationInvestment, rateReturn) =>{

    const months = (durationInvestment*12)
    const rateMonth = rateReturn / 100 / 12

    const totalInvested = monthlyAmount*months

    let finalValue = monthlyAmount * (Math.pow(1 + rateMonth, months) - 1) / rateMonth;


    finalValue = parseInt(finalValue.toFixed(0));
    const wealthGained = finalValue - totalInvested

    return { totalInvested, finalValue, wealthGained }

}