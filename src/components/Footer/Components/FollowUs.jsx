import styles from './Styles/FollowUs.module.css'
import { Link } from 'react-router-dom'
import facebook from '../static/facebok.png'
// Add links on link field
const socialNetworks = [
    {   
        label:'Instagram',
        image:'https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph.png',
        link:''
    },{   
        label:'Facebook',
        image:`${facebook}`,
        link:''
    },{   
        label:'Twitter',
        image:'https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/twitter-icon-18-256.png',
        link:''
    },{   
        label:'LinkedIn',
        image:'https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/linkedin-icon-18-256.png',
        link:''
    },{   
        label:'Youtube',
        image:'https://www.pngkit.com/png/full/267-2677559_youtube-white-icon-transparent-background.png',
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