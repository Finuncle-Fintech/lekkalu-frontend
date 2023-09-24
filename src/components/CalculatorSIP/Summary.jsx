import { Pie, PieChart, Cell, Tooltip, Legend } from 'recharts';
import { CustomLabelPie } from 'components/shared/CustomLabelPie/CustomLabelPie';
import 'animate.css'

export default function Summary({ summary }) {
  const data = [
    { name: 'Total Invested', value: summary.totalInvested },
    { name: 'Wealth Gained', value: summary.wealthGained },
  ];

  const labels = [
    {
      title: 'Total invested:',
      value: summary.totalInvested,
    },
    {
      title: 'Final value:',
      value: summary.finalValue,
    },
    {
      title: 'Wealth gained:',
      value: summary.wealthGained,
    },
  ];

  return (
    <>
      {
       summary.length!==0&&(
        <article
        className="border rounded-3 d-flex align-items-center justify-content-center p-1 py-md-4 animate__animated animate__fadeIn"
        >

        <div style={{
            display:'flex',
            flexDirection:"column",
            gap:'1vw'
        }}>

            <h4>Summary</h4>
        
            <div
              style={{
              width: '100%',
              padding: '1vw',
              display: 'flex',
              flexDirection: 'column',
              gap: '.6rem',
              }}
            >
            {labels.map((data, index) => (
            <div
                key={index}
                className="d-flex"
                style={{
                borderBottom: '1px solid #EAEAEA',
                }}
            >
                <span>{data.title} </span>
                <span>{data.value} ₹</span>
            </div>
            ))}
            </div>
        </div>

        <PieChart width={200} height={220}>
                <Pie
                dataKey="value"
                data={data}
                outerRadius={80}
                labelLine={false}
                >
                {data.map((entry, index) => (
                    <Cell key={index} fill={entry.name.includes('Total Invested')?'#099fea':'#09ea49'} />
                ))}
                </Pie>
                <Legend/>
                <Tooltip content={<CustomLabelPie />} />
        </PieChart>
        </article>
       )
      }
    </>
  );
}
