import React, { useState, useEffect } from 'react';
import styles from './Subscription.module.css';
import SubscriptionContainer from 'components/SubscriptionContainer/SubscriptionContainer';

const Subscription = () => {
  return (
    <div className={styles.subscriptionContainer}>
      <SubscriptionContainer />
    </div>
  );
};

export default Subscription;