import styles from './Hero.module.css'
import HeroHeader from "components/HeroHeader/HeroHeader";
import HeroContainer from 'components/HeroContainer/HeroContainer';
import HeroDescription from 'components/HeroDescription/HeroDescription';

const Hero = ({}) => {
    return (
        <div className={styles.heroContainer}>
            <HeroHeader/>
            <HeroContainer/>
            <HeroDescription/>
        </div>
    )
}

export default Hero;