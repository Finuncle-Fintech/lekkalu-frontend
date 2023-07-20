import styles from './SingleCardExpenses.module.css'
export default function SingleCardExpenses({data, title}){
    return(
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <span>{title}</span>
                <button>+</button>
            </div>
            <ul className={styles.containerLi}>
                {
                    data.map((data)=>(
                    <li key={data.id}>
                        <span>{data.month}</span>
                        <span>{data.limit}</span>
                    </li>
                    ))
                }
            </ul>
        </div>
    )
}