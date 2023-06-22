import styles from './LoadStatus.module.css'
import CircleLoading from './CircleLoading'
export default function LoadStatus(){

    return(
        <div className={styles.container}>
            <p>Uploading the excel</p>
            <CircleLoading />
        </div> 
    )
}
