import styles from './Hero.module.css'
import HeroContainer from 'components/HeroContainer/HeroContainer';
import HeroDescription from 'components/HeroDescription/HeroDescription';

const Hero = () => {
    return (
        <div className={styles.heroContainer}>
            <HeroContainer/>
            <HeroDescription/>
        </div>
    )
}

export default Hero;