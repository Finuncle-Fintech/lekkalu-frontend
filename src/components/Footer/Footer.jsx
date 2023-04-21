import styles from './Footer.module.css'

import AboutUs from './Components/AboutUs'
import CalculatorWidget from './Components/CalculatorsWidget'
import FollowUs from './Components/FollowUs'

export default function Footer(){
    return(
        <div className={styles.footer}>
            <AboutUs />
            <CalculatorWidget />
            <FollowUs />
        </div>
    )
}