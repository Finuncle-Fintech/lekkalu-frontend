import styles from './styles/FollowUs.module.css'
import { Link } from 'react-router-dom'
import facebook from '../static/facebok.png'
import instagram from '../static/instagram.png'
import twitter from '../static/twitter.png'
import linkedin from '../static/linkedin.png'
import youtube from '../static/youtube.png'
// Add links on link field
const socialNetworks = [
    {   
        label:'Instagram',
        image:`${instagram}`,
        link:''
    },{   
        label:'Facebook',
        image:`${facebook}`,
        link:''
    },{   
        label:'Twitter',
        image:`${twitter}`,
        link:''
    },{   
        label:'LinkedIn',
        image:`${linkedin}`,
        link:''
    },{   
        label:'Youtube',
        image:`${youtube}`,
        link:''
    }
]

export default function FollowUs () {
    return(
        <div className={styles.container}>
            <h3><Link>Follow Us</Link></h3>
            <div className={styles.containerSN}>
                {
                    socialNetworks.map((data, index)=>(
                        <Link href={data.link} key={index}>
                            <img src={data.image} alt={data.label} />
                        </Link>
                    ))
                }
            </div>
            <p className={styles.phraseP}>You can also download our EMI Calculator app from the App Store.</p>
            <div className={styles.containerDownload}>
                <Link>
                    <button>Get on <br></br> App Store here</button>
                </Link>
                <div>
                    <img src="https://lh3.googleusercontent.com/bXsJnF2AQA-xAG7GdoS6X5icWJvEZkRwRqc_RkUJG4c-CHbFF--y1xKbY1nEDuuvRkqP=w300-rw" alt="" />
                </div>
            </div>
        </div>
    )
}