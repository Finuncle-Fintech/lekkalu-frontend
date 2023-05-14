import styles from './Background.module.css'

export default function Background ({handleClose, close}) {
    return(
        <div className={styles.blur} style={{display:close&&'none'}} id='blurBackground' onClick={handleClose}></div>
    )
}