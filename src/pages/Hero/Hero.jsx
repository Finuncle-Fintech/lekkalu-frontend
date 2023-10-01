import styles from './Hero.module.css'
import GuestHeader from "components/GuestHeader/GuestHeader";
import HeroContainer from 'components/HeroContainer/HeroContainer';
import HeroDescription from 'components/HeroDescription/HeroDescription';

const Hero = () => {
    return (
        <div className={styles.heroContainer}>
            <GuestHeader/>
            <HeroContainer/>
            <HeroDescription/>
        </div>
    )
}

export default Hero;