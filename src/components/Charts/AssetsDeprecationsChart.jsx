import { LineChart, Line, Brush, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend} from "recharts"
import Colors from "constants/colors"

const calculateDeprecationData = (purchaseValue, depreciation_frequency, deprecationPercent, sellDate, purchasedDate, active, sellValue) =>{
    const initalVal = parseFloat(purchaseValue)
    const sellVal = parseFloat(sellValue)

    const startDay = new Date(purchasedDate).getTime()
    const sellDay = new Date(sellDate).getTime()
    const usefulLifeoftheAssets = ( sellDay -startDay)/(1000*60*60*24)

    const daysOfDeprecation = Math.round(depreciation_frequency / 86400)

    const usefulLifePeriods = Math.round(usefulLifeoftheAssets/daysOfDeprecation)

    const depreciationPerPeriods = Math.round((initalVal - sellVal) / usefulLifePeriods)

    //Get points 
    let depreciationData = []

    let currentDate = new Date(startDay)
    let currentValue = initalVal
    for (let i = 0 ; i<=usefulLifePeriods ; i++){
        const year = currentDate.getFullYear();
        const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        const day = ("0" + currentDate.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;

        depreciationData.push({data:shortDate(formattedDate), value:shortNumbers(currentValue)})

        currentValue -=depreciationPerPeriods
        currentDate.setDate(currentDate.getDate() + daysOfDeprecation);
    }
    return depreciationData
}

function shortNumbers(n){
    let x=(''+n).length;
    const p=Math.pow;
    const d=p(10,true);
    x-=x%3;
    return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3];
}
function shortDate (date){
    const shortDate = date.slice(2, date.length-1)
    return shortDate.replace('-', '/').replace('-', '/')
}

export default function AssetsDeprecationsChart({data}){
    const { depreciation_frequency, depreciation_percent, sell_date, sell_value, name, purchase_value, purchase_date } = data[0]

    const dataToShow = calculateDeprecationData(purchase_value, depreciation_frequency, depreciation_percent, sell_date, purchase_date, name, sell_value)

    return(
        <div className='section-outer-wrapper col-md-8 mx-auto mb-5 mt-5'  style={{ backgroundColor: Colors.graphBG }}>
            <h3 className='section-title text-white text-center'>Assets depreciation</h3>
            <ResponsiveContainer width='100%' aspect={2}>
                <LineChart  margin={{ top: 5, right: 0, bottom: 25, left: 10 }}  data={dataToShow} >
                    <Line dataKey='value' type='monotone'  name={`${name} value`}/>

                    <XAxis dataKey="data"  tick={{ fill: Colors.white }}/>

                    <YAxis dataKey="value" type='category'  tickFormatter={(tick) => {
                        return `\u20B9${tick}`;
                     }} tick={{ fill: Colors.white }} />

                    <Legend
                     layout='horizontal'
                     verticalAlign='top'
                     align='center'
                  />
                    <Tooltip />
                    <Brush data='data' height={30} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}