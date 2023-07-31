import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function CalculatorCAGR({setSummary}){
    const [ initialVal, setInitialVal ] = useState(false)
    const [ finalVal, setFinalVal ] = useState(false)
    const [ durationInvestment, setDurationInvestment ] = useState(false)
    const [ error, setError ] = useState(false)

    const handleCalculate = (e) =>{
        e.preventDefault()
        if(!initialVal || !finalVal || !durationInvestment){
            setError({
                initialVal:!initialVal,
                finalVal:!finalVal,
                durationInvestment:!durationInvestment
            })
            setSummary([])
            return
        }
        const { initialValNum, finalValNum, durationInvestmentNum, CAGRPercentage } = getCAGR(initialVal, finalVal, durationInvestment)
        setSummary([[
          {
            name: 'Inital Value',
            value: initialValNum,
          },
          {
            name: 'Final Value',
            value: finalValNum,
          },
        ], CAGRPercentage] );
        setError(false)
    }

    return(
        <form action="" style={{
            display:'grid',
            gridTemplateColumns:'repeat(2,1fr)',
            gap:".7rem"
        }}
        onSubmit={(e)=>handleCalculate(e)}
        >
            <TextField error={error.initialVal} type='number' onChange={(e)=>setInitialVal(e.target.value)} label='Initial value (₹)' />
            <TextField error={error.finalVal} type='number' onChange={(e)=>setFinalVal(e.target.value)} label='Final Value Costs (₹)' />
            <TextField error={error.durationInvestment} type='number' onChange={(e)=>setDurationInvestment(e.target.value)} label='Duration of Investment (Years)' />
            <Button variant="contained" type="submit" color="primary">
                Calculate
            </Button>
        </form>
    )
}

const getCAGR = (initialVal, finalVal, durationInvestment) =>{
    const initialValNum = parseFloat(initialVal)
    const finalValNum = parseFloat(finalVal)
    const durationInvestmentNum = parseInt(durationInvestment)
  
    const CAGRPercentage = (((Math.pow(finalValNum / initialValNum, 1 / durationInvestmentNum) - 1) * 100)).toFixed(2);

    return { CAGRPercentage, durationInvestment, finalValNum, initialValNum}
}