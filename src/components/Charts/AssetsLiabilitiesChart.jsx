import Colors from 'constants/colors';
import {
   PieChart,
   Pie,
   Cell,
   Tooltip,
   Legend,
   ResponsiveContainer,
   Surface,
   Symbols,
} from 'recharts';
import { useEffect } from 'react';

export const AssetsLiabilitiesChart = (props) => {
   let totalValue = props.data.totalVal;
   let pieData;
   if (props.type == 'assets') {
      pieData = props.data.finalAssets;
   } else if (props.type == 'liabilities') {
      pieData = props.data.finalLiabilities;
   }
   // const pieData = [
   //    {
   //       name: 'Thar',
   //       value: 1093719,
   //    },
   //    {
   //       name: 'Home Security',
   //       value: 55000,
   //    },
   //    {
   //       name: 'PF',
   //       value: 1000454,
   //    },
   //    {
   //       name: 'Pension',
   //       value: 45000,
   //    },
   //    {
   //       name: 'ELSS',
   //       value: 233000,
   //    },
   //    {
   //       name: 'Equity',
   //       value: 15000,
   //    },
   //    {
   //       name: 'Cash',
   //       value: 106000,
   //    },
   //    {
   //       name: 'Gold',
   //       value: 286664,
   //    },
   //    {
   //       name: 'Liquid Funds',
   //       value: 10000,
   //    },
   //    {
   //       name: 'Lent',
   //       value: 1105013,
   //    },
   // ];

   let RenderCustomizedLabelLine = (props) => {
      return props.percent * 100 > 1 ? (
         <path
            stroke={props.stroke}
            d={`M${props.points[0].x},${props.points[0].y}L${props.points[1].x},${props.points[1].y}`}
            className='customized-label-line'
         />
      ) : (
         <polyline stroke={props.stroke} fill='none' />
      );
   };

   let RenderLabel2 = (props) => {
      const RADIAN = Math.PI / 180;
      const radius =
         25 + props.innerRadius + (props.outerRadius - props.innerRadius);
      const x = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
      const y = props.cy + radius * Math.sin(-props.midAngle * RADIAN);

      return props.percent * 100 > 1 ? (
         <text
            className='recharts-text recharts-pie-label-text'
            x={x}
            y={y}
            fontSize='16'
            fontFamily='sans-serif'
            dominantBaseline='central'
            cy={props.cy}
            cx={props.cx}
            fill='#666'
            textAnchor={props.x > props.cx ? 'start' : 'end'}
         >
            {props.name}{' '}
            {Number.isInteger(props.percent * 100)
               ? Number(props.percent * 100)
               : Number(props.percent * 100).toFixed(1)}
            %
         </text>
      ) : (
         <g>
            <text x={500} y={y} fill='#transparent' rotate='90'></text>
         </g>
      );
   };

   let renderCusomizedLegend = (props) => {
      const { payload } = props;
      return (
         <div className='customized-legend'>
            <ul>
               {payload.map((entry, index) => (
                  <li
                     key={`item-${index}`}
                     style={{ color: `url(#myGradient${index})` }}
                  >
                     {entry.value}
                  </li>
               ))}
            </ul>
         </div>
      );
   };

   const CustomTooltip = ({ active, payload, percent }) => {
      if (active) {
         return (
            <div
               className='custom-tooltip'
               style={{
                  backgroundColor: '#ffff',
                  padding: '5px',
                  border: '0.5px solid #cccc',
                  borderRadius: 5 + 'px',
               }}
            >
               <label>
                  {`${payload[0].name} : ` +
                     ((`${payload[0].value}` * 100) / totalValue).toFixed(2) +
                     '%'}
               </label>
            </div>
         );
      }

      return null;
   };

   return (
      <>
         {console.log(pieData.value)}
         {pieData &&
         pieData.length !== 0 &&
         !(pieData.length == 1 && pieData[0].value == 0) ? (
            <ResponsiveContainer width={'80%'} aspect={3}>
               <PieChart>
                  <defs>
                     {pieData.map((entry, index) => (
                        <linearGradient
                           id={`myGradient${index}`}
                           key={`myGradient${index}`}
                        >
                           <stop
                              offset='0%'
                              stopColor={
                                 Colors.PIE[index % Colors.PIE.length].start
                              }
                           />
                           <stop
                              offset='100%'
                              stopColor={
                                 Colors.PIE[index % Colors.PIE.length].end
                              }
                           />
                        </linearGradient>
                     ))}
                  </defs>
                  <Pie
                     data={pieData}
                     color='#000000'
                     dataKey='value'
                     nameKey='name'
                     cx='50%'
                     cy='50%'
                     outerRadius={120}
                     fill='#8884d8'
                     label={RenderLabel2}
                     labelLine={RenderCustomizedLabelLine}
                  >
                     {/* {pieData.map((entry, index) => (
                  <Cell
                     key={`cell-${index}`}
                     fill={COLORS[index % COLORS.length]}
                  />
               ))} */}

                     {pieData.map((entry, index) => (
                        <Cell
                           key={`cell-${index}`}
                           fill={`url(#myGradient${index})`}
                        />
                     ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                     layout='vertical'
                     verticalAlign='top'
                     align='right'
                     payload={pieData.map((item, index) => ({
                        id: item.name,
                        type: 'square',
                        value:
                           item.name +
                           ` : ` +
                           ((item.value * 100) / totalValue).toFixed(2) +
                           `%`,
                        color: `url(#myGradient${index})`,
                     }))}
                  />
               </PieChart>
            </ResponsiveContainer>
         ) : (
            <h4>No data for {props.type} chart</h4>
         )}
      </>
   );
};
