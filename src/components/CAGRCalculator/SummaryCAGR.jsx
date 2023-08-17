import PieCAGR from "./PieCAGR"


export default function SummaryCAGR({summary}){
    return(
        <article className="border rounded p-2 d-flex justify-content-center align-items-center flex-column">
            <h2>Summary</h2>
            <PieCAGR data={summary[0]} />
            <span className="m-3">Your CAGR is: {summary[1]}%</span>
        </article>
    )
}