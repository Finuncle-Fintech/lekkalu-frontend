import { Box, Typography } from "@mui/material";

const Logo = () => {
    return (
      <Box
        sx={{
          width: "34vw",
          height: "100%",
          display: "flex",
          justifyContent: "left",
          alignItems: "inherit",
          paddingLeft: "3vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "25px",
              height: "25px",
              backgroundColor: "white",
              borderRadius: "50%",
              marginBottom: "5vh",
              marginRight: "1.5vh",
            }}
          ></div>
  
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              lineHeight: "25px",
            }}
          >
            {" "}
            finuncle
          </Typography>
        </Box>
      </Box>
    );
  };

  export default Logo;