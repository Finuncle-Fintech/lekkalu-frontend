import styles from './Hero.module.css'
import HeroHeader from "components/HeroHeader/HeroHeader";
import Subscription from 'components/Subscription/Subscription';

const Hero = () => {
    return (
        <div className={styles.subscriptionContainer}>
            <HeroHeader/>
            <Subscription/>
        </div>
    )
}

export default Hero;