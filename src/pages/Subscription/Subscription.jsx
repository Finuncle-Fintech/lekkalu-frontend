import React, { useState, useEffect } from 'react';
import styles from './Subscription.module.css';
import GuestHeader from 'components/GuestHeader/GuestHeader';
import SubscriptionContainer from 'components/SubscriptionContainer/SubscriptionContainer';

const Subscription = () => {
  return (
    <div className={styles.subscriptionContainer}>
      <GuestHeader />
      <SubscriptionContainer />
    </div>
  );
};

export default Subscription;