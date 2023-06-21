import styles from './SingleCardExpenses.module.css'
export default function SingleCardExpenses(){
    return(
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <span>Budget</span>
                <button>+</button>
            </div>
            <ul className={styles.containerLi}>
                <li>
                    <span>item 1</span>
                    <span>234</span>
                </li>
                <li>
                    <span>item 2</span>
                    <span>234</span>
                </li>
                <li>
                    <span>item 3</span>
                    <span>234</span>
                </li>
                <li>
                    <span>item 4</span>
                    <span>234</span>
                </li>
            </ul>
        </div>
    )
}