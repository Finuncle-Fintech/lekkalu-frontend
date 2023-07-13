import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Context } from 'provider/Provider';
import { WeeklyChart } from './WeeklyChart';
import BeatLoader from 'react-spinners/BeatLoader';
import Colors from 'constants/colors';
import { SpentBalanceChart } from './SpentBalanceChart';
import { CumSumChart } from './CumSumChart';
import { AssetsLiabilitiesChart } from './AssetsLiabilitiesChart';
import AssetsDeprecationsChart from './AssetsDeprecationsChart';

const Test = () => {
   const { weeklyExpense, fetchData, monthlyExpenses, assets, liabilities, deprecations } =
      useContext(Context);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState();

   const fetchAPI = async () => {
      await fetchData().then(() => {});
   };
   useEffect(() => {
      fetchAPI();
   }, []);

   return (
      <div>
         {/* {isError ? <h3>Error</h3> : null} */}
         {monthlyExpenses.length == 0 && weeklyExpense.length == 0 ? (
            <div
               className='section col-md-8 mx-auto pb-5 pt-5 mt-5'
               style={{
                  backgroundColor: Colors.graphBG,
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
               <AssetsLiabilitiesChart data={assets} type={'assets'} />
               <AssetsDeprecationsChart data={deprecations}/>
               <AssetsLiabilitiesChart
                  data={liabilities}
                  type={'liabilities'}
               />
            </>
         )}
      </div>
   );
};

export default Test;
