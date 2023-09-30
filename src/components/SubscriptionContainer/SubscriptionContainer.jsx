import styles from './SubscriptionContainer.module.css';
import icon from '../../assets/Vector.svg';

const Subscription = () => {
    return (
        <div className={styles.subscriptionContainer}>
            <h1 className={styles.subscriptionTitle}>Choose your Subscription <br />Plan</h1>
            <div className={styles.subscriptions}>
                <div className={styles.subscription}>
                    <p className={styles.subscriptionType}>Free</p>
                    <p className={styles.subscriptionPrice}><span className={styles.price}>0</span>/mo</p>
                    <div className={styles.subscriptionfeatures}>
                        <img src={icon} alt="" className={styles.subscriptionfeaturesImage}/>
                        <p className={styles.subscriptionfeaturesText}>Calculator</p>
                    </div>
                    <div className={styles.subscriptionfeatures}>
                        <img src={icon} alt="" className={styles.subscriptionfeaturesImage}/>
                        <p className={styles.subscriptionfeaturesText}>Access to loans</p>
                    </div>
                    <div className={styles.subscriptionfeatures}>
                        <img src={icon} alt="" className={styles.subscriptionfeaturesImage}/>
                        <p className={styles.subscriptionfeaturesText}>Balance sheet</p>
                    </div>
                    <button className={styles.activeButton}>Already using</button>
                </div>

                <div className={styles.subscription}>
                    <p className={styles.subscriptionType}>Premium</p>
                    <p className={styles.subscriptionPrice}><span className={styles.price}>9.99</span>/mo</p>
                    <div className={styles.subscriptionfeatures}>
                        <img src={icon} alt="" className={styles.subscriptionfeaturesImage}/>
                        <p className={styles.subscriptionfeaturesText}>Calculator</p>
                    </div>
                    <div className={styles.subscriptionfeatures}>
                        <img src={icon} alt="" className={styles.subscriptionfeaturesImage}/>
                        <p className={styles.subscriptionfeaturesText}>Access to loans</p>
                    </div>
                    <div className={styles.subscriptionfeatures}>
                        <img src={icon} alt="" className={styles.subscriptionfeaturesImage}/>
                        <p className={styles.subscriptionfeaturesText}>Balance sheet</p>
                    </div>
                    <button className={styles.subscriptionButton}>Buy now</button>
                </div>

                <div className={styles.subscription}>
                    <p className={styles.subscriptionType}>Business</p>
                    <p className={styles.subscriptionPrice}><span className={styles.price}>29.99</span>/mo</p>
                    <div className={styles.subscriptionfeatures}>
                        <img src={icon} alt="" className={styles.subscriptionfeaturesImage}/>
                        <p className={styles.subscriptionfeaturesText}>Calculator</p>
                    </div>
                    <div className={styles.subscriptionfeatures}>
                        <img src={icon} alt="" className={styles.subscriptionfeaturesImage}/>
                        <p className={styles.subscriptionfeaturesText}>Access to loans</p>
                    </div>
                    <div className={styles.subscriptionfeatures}>
                        <img src={icon} alt="" className={styles.subscriptionfeaturesImage}/>
                        <p className={styles.subscriptionfeaturesText}>Balance sheet</p>
                    </div>
                    <button className={styles.subscriptionButton}>Buy now</button>
                </div>
            </div>
        </div>
    )
}

export default Subscription