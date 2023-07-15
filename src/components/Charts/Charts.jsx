import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Context } from 'provider/Provider';
import { WeeklyChart } from './WeeklyChart';
import BeatLoader from 'react-spinners/BeatLoader';
import Colors from 'constants/colors';
import { SpentBalanceChart } from './SpentBalanceChart';
import { CumSumChart } from './CumSumChart';
import { AssetsLiabilitiesChart } from './AssetsLiabilitiesChart';

const ExpensesCharts = () => {
   const { weeklyExpense, fetchData, monthlyExpenses, assets, liabilities } =
      useContext(Context);

   const fetchAPI = async () => {
      await fetchData().then((data) => { console.log({data}) }).catch((err => console.log({err})));
   };
   useEffect(() => {
      fetchAPI();
   }, []);

   return (
      <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'3vw', paddingTop:'3vw'}}>
         {monthlyExpenses.length == 0 && weeklyExpense.length == 0 ? (
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
               {/* <AssetsLiabilitiesChart data={assets} type={'assets'} />
               <AssetsLiabilitiesChart
                  data={liabilities}
                  type={'liabilities'}
               /> */}
            </>
         )}
      </div>
   );
};

export default ExpensesCharts;
