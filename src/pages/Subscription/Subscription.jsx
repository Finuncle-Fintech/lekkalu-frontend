import React, { useState, useEffect } from 'react';
import styles from './Subscription.module.css';
import HeroHeader from 'components/HeroHeader/HeroHeader';
import MobileHeader from 'components/MobileHeader/MobileHeader';
import SubscriptionContainer from 'components/SubscriptionContainer/SubscriptionContainer';

const Subscription = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.subscriptionContainer}>
      {isMobile ? <MobileHeader /> : <HeroHeader />}
      <SubscriptionContainer />
    </div>
  );
};

export default Subscription;