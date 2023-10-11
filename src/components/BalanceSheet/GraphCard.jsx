import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import BasicMenu from "components/Header/HeaderComponents/BasicMenu";
import { AssetsLiabilitiesChart } from "components/Charts/AssetsLiabilitiesChart";
import { Box, Typography, Button } from "@mui/material";
import Pie from "./Pie";

export default function GraphCard(props) {
  const userSetting = {
    submenu: {},
    title: "Balance sheet",
    img: "https://img.icons8.com/material-outlined/24/menu-2.png",
  };
  return (
    <>
      <Typography
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          margin: "2vw",
          fontSize: "1.5em",
          fontWeight: "bold",
        }}
      >
        Balance Sheet
      </Typography>
      {/* Curved parent */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "40px",
          display: "flex",
          padding: "3%",
          marginBottom: "100px",
          "@media (max-width: 800px)": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            padding: "3%",
            boxShadow: "0px 0px 5px #000",
            width: "100%",
            height: "100%",
          }}
        >
          <Box>
            <Typography
              sx={{
                marginLeft: "5%",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              Graphs
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {" "}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Pie
                  component={
                    <AssetsLiabilitiesChart
                      data={props.assetDatas}
                      type={"assets"}
                    />
                  }
                />
              </Box>
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Pie
                  component={
                    <AssetsLiabilitiesChart
                      data={props.liabilityDatas}
                      type={"liabilities"}
                    />
                  }
                />
              </Box>
            </Box>{" "}
            <Box sx={{ width: "100%", display: "flex" }}>
              {" "}
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                  margin: "10px 0 0 0",
                  textAlign: "center",
                  width: "50%",
                }}
              >
                Assets
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                  margin: "10px 0 0 0",
                  textAlign: "center",
                  width: "50%",
                }}
              >
                Liabilities
              </Typography>
            </Box>
            <Box sx={{ width: "70%", textAlign: "center" }}>
              <Button
                sx={{
                  fontSize: "12px",
                  fontWeight: "700",
                  borderRadius: "10px",
                  color: "black",
                  boxShadow: "0px 0px 2px #000",
                }}
                onClick={props.setBarGraphIsOpen}
              >
                Bar Chart <NavigateNextIcon />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: "5%",
            borderRadius: "10px",
            padding: "3% 2% 3% 2%",
            boxShadow: "0px 0px 5px #000",
            "@media (max-width: 1050px)": {
              display: "none",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            Statistics
          </Typography>{" "}
          <Typography
            sx={{
              width: "13vw",
              margin: "30% 0 0 0 ",
              fontSize: "45px",
              display: "flex",
              alignItems: "center",
              color: "primary.main",
            }}
          >
            36
          </Typography>
          <Button
            sx={{
              fontSize: "12px",
              fontWeight: "700",
              borderRadius: "10px",
              margin: "5% 0 20% 0",
              color: "black",
              boxShadow: "0px 0px 2px #000",
            }}
          >
            View More <NavigateNextIcon />
          </Button>
          <Typography
            sx={{
              margin: "30% 0 0 0 ",
              fontSize: "45px",
              display: "flex",
              alignItems: "center",
              color: "#55BC97",
            }}
          >
            2.76%
          </Typography>
          <Box>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "700",
                color: "#55BC97",
                background: "#00BA341A",
                display: "inline",
                padding: "5%",
              }}
            >
              56%
              <NorthEastIcon />
            </Typography>
          </Box>
          <Button
            sx={{
              fontSize: "12px",
              fontWeight: "700",
              borderRadius: "10px",
              margin: "10% 0 0 0",
              color: "black",
              boxShadow: "0px 0px 2px #000",
            }}
          >
            View More <NavigateNextIcon />
          </Button>
        </Box>

        {/* Responsive view */}
      </Box>{" "}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "40px",
          display: "flex",
          flexDirection: "column",
          margin: "30px 0 50px 0",
          padding: "3%",
          "@media (min-width: 800px)": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "700",
              textAlign: "center",
              display: "inline",
              paddingLeft: "5%",
            }}
          >
            Assets
          </Typography>
          <BasicMenu Menu={userSetting} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Pie
            title={"Liabilities"}
            component={
              <AssetsLiabilitiesChart data={props.assetDatas} type={"assets"} />
            }
          />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "40px",
          display: "flex",
          flexDirection: "column",
          marginBottom: "15%",
          padding: "3%",
          "@media (min-width: 800px)": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "700",
              textAlign: "center",
              display: "inline",
              paddingLeft: "5%",
            }}
          >
            Liability
          </Typography>
          <BasicMenu Menu={userSetting} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Pie
            title={"Liabilities"}
            component={
              <AssetsLiabilitiesChart
                data={props.liabilityDatas}
                type={"liabilities"}
              />
            }
          />
        </Box>
      </Box>
    </>
  );
}
