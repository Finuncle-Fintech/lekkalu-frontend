import styles from './Styles/CalculatorsWidget.module.css'
import { Link } from 'react-router-dom'

export default function CalculatorWidget () {
    return(
        <div className={styles.container}>
            <h3><Link>Calculators & Widgets</Link></h3>
            <h5><Link>EMI Calculator</Link></h5>
            <h5><Link>Loan Calculator — Calculate EMI, Affordability, Tenure & Interest Rate</Link></h5>
            <h5><Link>Mobile-friendly EMI Calculator Widget</Link></h5>
        </div>
    )
}