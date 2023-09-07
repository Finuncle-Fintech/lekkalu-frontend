import CalculatorSIP from "components/CalculatorSIP/CalculatorSIP"
import { useState } from "react"
import Summary from "components/CalculatorSIP/Summary"

export default function SIPCalculator(){
    const [ summary, setSummary ] = useState([])
    return(
        <section className=' container-fluid px-md-5 py-5 py-md-0 '>
            <article className='container d-flex justify-content-start align-items-start p-md-5 '>

                <div className="d-flex md-p-5  d-flex flex-column flex-md-row align-items-center" style={{gap:'3vw'}} >
                    <div className="d-flex flex-column" style={{gap:'3vw'}}>
                        <div className="d-flex flex-column align-items-start">
                            <h2 className="fs-2">SIP Calculator</h2>
                            <p>Calculate returns on your SIP investments.</p>
                        </div>
                        <CalculatorSIP setSummary={setSummary} />
                    </div>
                    <Summary summary={summary} />
                </div>
            </article>
        </section>
    )
}