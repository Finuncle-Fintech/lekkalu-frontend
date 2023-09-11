import styles from './Hero.module.css'
import HeroHeader from "components/HeroHeader/HeroHeader";
import HeroContainer from 'components/HeroContainer/HeroContainer';

const Hero = () => {
    return (
        <div className={styles.heroContainer}>
            <HeroHeader/>
            <HeroContainer/>
        </div>
    )
}

export default Hero;