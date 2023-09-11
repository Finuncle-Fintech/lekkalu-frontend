import styles from './HeroDescription.module.css';
import firstIcon from '../../assets/HeroImages/hero-icon-1.svg';
import secondIcon from '../../assets/HeroImages/hero-icon-2.svg';
import thirdIcon from '../../assets/HeroImages/hero-icon-3.svg';
import arrowIcon from '../../assets/HeroImages/arrow-right.svg';

const HeroDescription = () => {
    return (
        <div className={styles.heroDescription}>
            <div className={styles.descriptionSection}>
                <div>
                     <p className={styles.whyChooseUs}>Why Choose Us?</p>
                     <h2 className={styles.title}>We are the team<br />of enthusiasts</h2>
                </div>
                <div>
                    <p className={styles.descriptionText}>Our technology suite is engineered to support diverse
business needs on-<br />demand. Our communal culture,
performance excellence and private cloud<br /> technology
paves the way for unprecedented customer support.</p>
                    <button className={styles.descriptionButton}>
                        <p className={styles.buttonText}>Explore</p>
                        <img className={styles.buttonImage} src={arrowIcon} alt="arrow" />
                    </button>
                </div>
            </div>

            <div className={styles.userAassistance}>
                <div className={styles.userAssistanceElement}>
                    <img className={styles.userAssistanceImage} src={firstIcon} alt="Saving more money easily" />
                    <p className={styles.userAssistanceTitle}>Saving more money easily</p>
                    <p className={styles.userAssistanceText}>we can help you save more money and<br />keep you on your toes. by investing your<br />funds, the money you have today can be<br />more useful.</p>
                </div>

                <div className={styles.userAssistanceElement}>
                    <img className={styles.userAssistanceImage} src={secondIcon} alt="Get your dream target" />
                    <p className={styles.userAssistanceTitle}>Get your dream target</p>
                    <p className={styles.userAssistanceText}>we can help you save more money and<br />keep you on your toes. by investing your<br />funds, the money you have today can be<br />more useful.</p>
                </div>

                <div className={styles.userAssistanceElement}>
                    <img className={styles.userAssistanceImage} src={thirdIcon} alt="Effective and efficient" />
                    <p className={styles.userAssistanceTitle}>Effective and efficient</p>
                    <p className={styles.userAssistanceText}>we can help you save more money and<br />keep you on your toes. by investing your<br />funds, the money you have today can be<br />more useful.</p>
                </div>
            </div>
        </div>
    )
}

export default HeroDescription;