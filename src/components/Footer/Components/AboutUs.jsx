import styles from './styles/AboutUs.module.css'

import { Link } from 'react-router-dom'

export default function AboutUs (){
    return(
        <div className={styles.container}>
            <h3><Link>About us</Link></h3>
            <h5><Link>Investor relations</Link></h5>
            <h5><Link>Suscribe to email</Link></h5>
            <h5><Link>Contact Us</Link></h5>
        </div>
    )
}