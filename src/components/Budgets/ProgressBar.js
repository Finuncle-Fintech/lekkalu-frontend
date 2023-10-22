import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

function ProgressBar({ stat1, stat2, title }) {
  const [Label1, val1] = stat1;
  const [Label2, val2] = stat2;
  return (
    <div style={{ margin: "16px 10px" }}>
 
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // marginBottom: '14px'
          columnGap: '10px',
          textAlign: 'right'
        }}
      >
        <h6
          style={{
            fontSize: 12,
            fontWeight: "800",
            textTransform: "capitalize",
            margin: 0,
            width: '60px',

          }}
        >
          {title}
        </h6>
        <div style={{flex: 1}}>
        <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "4px",
        }}
      >
        <h6
          style={{
            fontSize: 12,
            fontWeight: "500",
            textTransform: "uppercase",
            margin: 0,
            color: "#777",
          }}
        >
          {`${Label1} ${val1}`}
        </h6>
        <h6
          style={{
            fontSize: 12,
            fontWeight: "500",
            textTransform: "uppercase",
            margin: 0,
            color: ((val1 / val2) * 100) < 80 ? "#5be19f" : ((val1 / val2) * 100) < 95?"#fdba78":"#fd7878",
          }}
        >
          {`${val2-val1} ${Label2}`}
        </h6>
      </div>
      <div>

      
        
        <LinearProgress
        
          variant="determinate"
          value={(val1 / val2) * 100}
          sx={{
            height: 10,
            borderRadius: 5,
            [`&.${linearProgressClasses.colorPrimary}`]: {
              backgroundColor: ((val1 / val2) * 100) < 80 ? "#5be19f" : ((val1 / val2) * 100) < 95?"#fdba78":"#fd7878",
            },
            [`& .${linearProgressClasses.bar}`]: {
              // borderRadius: 5,
              backgroundColor: "#f2f2f2",
            },
          }}
        />
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
