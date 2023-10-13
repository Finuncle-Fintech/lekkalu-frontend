import styles from './HeroDescription.module.css';
import firstIcon from '../../assets/HeroImages/hero-icon-1.svg';
import secondIcon from '../../assets/HeroImages/hero-icon-2.svg';
import thirdIcon from '../../assets/HeroImages/hero-icon-3.svg';
import arrowIcon from '../../assets/HeroImages/arrow-right.svg';

const assistanceItems = [
    {
        icon: firstIcon,
        title: 'Saving more money easily',
        text: 'We can help you save more money and keep you on your toes. By investing your funds, the money you have today can be more useful.'
    },
    {
        icon: secondIcon,
        title: 'Get your dream target',
        text: 'We can help you save more money and keep you on your toes. By investing your funds, the money you have today can be more useful.'
    },
    {
        icon: thirdIcon,
        title: 'Effective and efficient',
        text: 'We can help you save more money and keep you on your toes. By investing your funds, the money you have today can be more useful.'
    }
]

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
                {assistanceItems.map((item, index) => (
                    <div key={index} className={styles.userAssistanceElement}>
                        <img className={styles.userAssistanceImage} src={item.icon} alt={item.title} />
                        <p className={styles.userAssistanceTitle}>{item.title}</p>
                        <p className={styles.userAssistanceText}>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HeroDescription;