import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
   ResponsiveContainer,
   ComposedChart,
   LineChart,
   Line,
   BarChart,
   Bar,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Legend,
} from 'recharts';

const updownbardata = [
   {
      name: 'October',
      uv: -12956,
      ab: 33492,
   },
   {
      name: 'November',
      uv: -33507,
      ab: 54043,
   },
   {
      name: 'December',
      uv: -58013,
      ab: 76901,
   },
   {
      name: 'January',
      uv: -54476,
      ab: 79476,
   },
   {
      name: 'February',
      uv: -21636,
      ab: 46636,
   },
];

const bardata = [
   {
      name: 'October',
      CumSum: -12956,
   },
   {
      name: 'November',
      CumSum: -46463,
   },
   {
      name: 'December',
      CumSum: -104476,
   },
   {
      name: 'January',
      CumSum: -158951.17,
   },
   {
      name: 'February',
      CumSum: -180587.49,
   },
   {
      name: 'March',
      uv: -155587.49,
   },
];

const data = [
   { label: '01-10-2022', WeeklySpend: 21818 },
   { label: '08-10-2022', WeeklySpend: 5710 },
   { label: '15-10-2022', WeeklySpend: 1023 },
   { label: '22-10-2022', WeeklySpend: 4941 },
   { label: '29-10-2022', WeeklySpend: 3234, RollAvg: 7345.2 },
   { label: '05-11-2022', WeeklySpend: 20722, RollAvg: 7126 },
   { label: '19-11-2022', WeeklySpend: 4147, RollAvg: 8578.4 },
   { label: '26-11-2022', WeeklySpend: 22051.71, RollAvg: 12000.542 },
   { label: '03-12-2022', WeeklySpend: 4017.98, RollAvg: 12157.338 },
   { label: '10-12-2022', WeeklySpend: 26544.98, RollAvg: 13321.934 },
   { label: '17-12-2022', WeeklySpend: 25953, RollAvg: 16542.934 },
   { label: '24-12-2022', WeeklySpend: 13089.5, RollAvg: 18331.434 },
   { label: '31-12-2022', WeeklySpend: 3575.6, RollAvg: 14636.212 },
   { label: '07-01-2023', WeeklySpend: 11938.1, RollAvg: 16220.236 },
   {
      label: '14-01-2023',
      WeeklySpend: 33516.2666666667,
      RollAvg: 17614.4933333333,
   },
   {
      label: '21-01-2023',
      WeeklySpend: 23950.4866666667,
      RollAvg: 17213.9906666667,
   },
   { label: '28-01-2023', WeeklySpend: 18077.07, RollAvg: 18211.5046666667 },
   { label: '04-02-2023', WeeklySpend: 25852, RollAvg: 22666.7846666667 },
   { label: '11-02-2023', WeeklySpend: 10537.8, RollAvg: 22386.7246666667 },
   { label: '18-02-2023', WeeklySpend: 0, RollAvg: 15683.4713333333 },
   { label: '25-02-2023', WeeklySpend: 0, RollAvg: 10893.374 },
];

export default function Recharts() {
   return (
      <div>
         <div
            className='section col-md-8 mx-auto mb-xl-5 mt-xl-5 pt-md-3'
            style={{ backgroundColor: '#545953' }}
         >
            <h3 className='section-title text-white text-center'>
               Weekly Spend Analysis
            </h3>
            <div className='section-content'>
               <ResponsiveContainer width='90%' aspect={3}>
                  <LineChart
                     data={data}
                     margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
                  >
                     <Tooltip />
                     <XAxis dataKey='label' dy={10} tick={{ fill: '#fff' }} />
                     <YAxis
                        tickFormatter={(tick) => {
                           return `\u20B9${tick}`;
                        }}
                        tick={{ fill: '#fff' }}
                     />
                     <CartesianGrid
                        stroke='#ccc'
                        strokeDasharray='0 0'
                        fill='#545953'
                     />
                     <Legend
                        layout='horizontal'
                        verticalAlign='top'
                        align='center'
                     />
                     <Line
                        type='monotone'
                        dataKey='WeeklySpend'
                        stroke='#17A8F5'
                        strokeWidth={2}
                     />
                     <Line
                        type='monotone'
                        dataKey='RollAvg'
                        stroke='#FB8833'
                        strokeWidth={2}
                     />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>
         <div
            className='section col-md-8 mx-auto mb-xl-5 mt-xl-5 pt-md-3 pb-md-3'
            style={{ backgroundColor: '#545953' }}
         >
            <h3 className='section-title text-white text-center'>Monthly</h3>
            <div className='section-content'>
               <ResponsiveContainer width='90%' aspect={3}>
                  <ComposedChart
                     width={500}
                     height={400}
                     data={bardata}
                     margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                     }}
                  >
                     <CartesianGrid
                        stroke='#ccc'
                        strokeDasharray='0 0'
                        fill='#545953'
                        vertical={false}
                     />
                     <XAxis dataKey='name' dy={10} tick={{ fill: '#fff' }} />
                     <YAxis
                        tickFormatter={(tick) => {
                           return `\u20B9${tick}`;
                        }}
                        tick={{ fill: '#fff' }}
                     />
                     <Tooltip />
                     <Legend
                        layout='horizontal'
                        align='center'
                        wrapperStyle={{
                           position: 'relative',
                        }}
                     />
                     <Bar dataKey='CumSum' barSize={160} fill='#a8a097' />
                     <Line
                        type='monotone'
                        dataKey='CumSum'
                        stroke='#a8a097'
                        strokeWidth={3}
                     />
                  </ComposedChart>
               </ResponsiveContainer>
            </div>
         </div>
         <div
            className='section col-md-8 mx-auto mb-xl-5 mt-xl-5 pt-md-3 pb-md-3'
            style={{ backgroundColor: '#545953' }}
         >
            <h3 className='section-title text-white text-center'>Monthly</h3>
            <div className='section-content'>
               <ResponsiveContainer width='90%' aspect={3}>
                  <ComposedChart
                     width={500}
                     height={400}
                     data={updownbardata}
                     margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                     }}
                  >
                     <CartesianGrid
                        stroke='#ccc'
                        strokeDasharray='0 0'
                        fill='#545953'
                        vertical={false}
                     />
                     <XAxis dataKey='name' dy={10} tick={{ fill: '#fff' }} />
                     <YAxis
                        tickFormatter={(tick) => {
                           return `\u20B9${tick}`;
                        }}
                        tick={{ fill: '#fff' }}
                     />
                     <Tooltip />
                     <Legend
                        layout='horizontal'
                        align='center'
                        wrapperStyle={{
                           position: 'relative',
                        }}
                     />
                     <Bar dataKey='ab' barSize={150} fill='#e09046' />
                     <Line
                        type='monotone'
                        dataKey='ab'
                        stroke='#e09046'
                        strokeWidth={2}
                     />
                     <Bar dataKey='uv' barSize={150} fill='#5cb9f2' />
                     <Line
                        type='monotone'
                        dataKey='uv'
                        stroke='#5cb9f2'
                        strokeWidth={2}
                     />
                  </ComposedChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
   );
}
