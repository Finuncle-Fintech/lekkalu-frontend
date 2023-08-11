export const CustomLabelPie = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p style={{background:'white'}} className="border rounded">{`${data.name}: ₹${data.value}`}</p>
        </div>
      );
    }
  
    return null;
  };