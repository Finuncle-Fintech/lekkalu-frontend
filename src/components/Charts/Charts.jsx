import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { WeeklyChart } from './WeeklyChart';
import BeatLoader from 'react-spinners/BeatLoader';
import Colors from 'constants/colors';
import { SpentBalanceChart } from './SpentBalanceChart';
import { CumSumChart } from './CumSumChart';
import { AssetsLiabilitiesChart } from './AssetsLiabilitiesChart';
import AssetsdepreciationChart from './AssetsDepreciationsChart';
import styles from './styles/Charts.module.css'

const ExpensesCharts = ({Context}) => {
   const { weeklyExpense, fetchData, monthlyExpenses, assets, liabilities, depreciation } =
      useContext(Context);

   const fetchAPI = async () => {
      await fetchData().then(() => {});
   };
   useEffect(() => {
      fetchAPI();
   }, []);


   return (
      <div className={styles.container} style={{paddingTop:'3vw'}}>
         {monthlyExpenses.length === 0 && weeklyExpense.length === 0  ? (
            <div
               className='section col-md-8 mx-auto pb-5 pt-5 mt-5'
               style={{
                  display: 'flex',
                  justifyContent: 'center',
               }}
            >
               <BeatLoader stylecolor={Colors.loaderColor} />
            </div>
         ) : (
            <>
               <WeeklyChart data={weeklyExpense} />
               <SpentBalanceChart data={monthlyExpenses} />
               <CumSumChart data={monthlyExpenses} />
               <AssetsdepreciationChart data={depreciation}/>
               {/* <AssetsLiabilitiesChart data={assets} type={'assets'} />
               <AssetsLiabilitiesChart
                  data={liabilities}
                  type={'liabilities'}
                */}
            </>
         )}
      </div>
   );
};

export default ExpensesCharts;
