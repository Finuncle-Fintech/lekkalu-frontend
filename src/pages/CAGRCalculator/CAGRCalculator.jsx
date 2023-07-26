import CalculatorCAGR from "components/CAGRCalculator/CalculatorCAGR"
import PieCAGR from "components/CAGRCalculator/PieCAGR"
import { useState } from "react"

export default function CAGRCalculator(){
    const [ summary, setSummary ] = useState([])
    return(
        <section className="container-fluid py-5 p-md-5">
            <article className="p-2 p-md-5 px-md-0 border rounded d-flex justify-content-center align-items-center flex-column flex-md-row" style={{
                gap:'3rem'
            }}>
                <div className="d-flex flex-column gap-3">
                    <h2>CAGR Calculator</h2>
                    <p>Calculate your Compound Annual Growth Rate</p>
                    <div>
                        <CalculatorCAGR setSummary={setSummary} />
                    </div>
                </div>
                {
                summary.length!==0&&(
                    <>
                    <PieCAGR data={summary} />
                    </>
                )
            }
            </article>
           
        </section>
    )
}