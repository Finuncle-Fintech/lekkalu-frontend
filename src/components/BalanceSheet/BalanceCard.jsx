import ContainerBalanceCard from "./ContainerBalanceCard"
import styles from './styles/BalanceCard.module.css'
import iconOptions from '../../assets/points-option-icon.svg'

export default function BalanceCard({component, title}){
    return(
        <ContainerBalanceCard>
            <div className={styles.container}>
                <div className="d-flex justify-content-between align-items-center">
                    <h4>{title}</h4>
                    <button className="btn border rounded-circle" >
                        <img src={iconOptions} width={15} alt="" />
                    </button>
                </div>
                {component}
            </div>
        </ContainerBalanceCard>
    )
}