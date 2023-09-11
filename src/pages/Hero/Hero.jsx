import styles from './Hero.module.css'
import HeroHeader from "components/HeroHeader/HeroHeader";

const Hero = () => {
    return (
        <div className={styles.heroContainer}>
            <HeroHeader/>
        </div>
    )
}

export default Hero;