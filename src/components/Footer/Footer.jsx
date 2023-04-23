import styles from './Footer.module.css'

import AboutUs from './Components/AboutUs'
import CalculatorWidget from './Components/CalculatorsWidget'
import FollowUs from './Components/FollowUs'
import FeedbackButton from './Components/FeedbackButton'

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.linksFooter}>
                <AboutUs />
                <CalculatorWidget />
                <FollowUs />
            </div>
            <FeedbackButton />
        </footer>
    )
}