import styles from './SendForm.module.css'
import check from './static/4964-check-mark-success-animation.gif'
export default function SendForm({emailSended}){
    return(
        <div className={styles.container} style={{display: !emailSended&&'none'}} >
            <img className={styles.image}  src={check} alt="" />
            <p>Email sent successfully</p>
        </div>
    )
}
    