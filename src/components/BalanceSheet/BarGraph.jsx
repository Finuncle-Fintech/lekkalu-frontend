import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";

import CloseIcon from "@mui/icons-material/Close";
import { Box, CssBaseline, IconButton, Drawer, Tooltip } from "@mui/material";
import BarChart from "./BarChart";

const data = [
  {
    country: "AD",
    "hot dog": 191,
    "hot dogColor": "hsl(343, 70%, 50%)",
    burger: 112,
    burgerColor: "hsl(272, 70%, 50%)",
    sandwich: 152,
    sandwichColor: "hsl(147, 70%, 50%)",
    kebab: 151,
    kebabColor: "hsl(243, 70%, 50%)",
    fries: 68,
    friesColor: "hsl(30, 70%, 50%)",
    donut: 141,
    donutColor: "hsl(65, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 40,
    "hot dogColor": "hsl(336, 70%, 50%)",
    burger: 74,
    burgerColor: "hsl(133, 70%, 50%)",
    sandwich: 116,
    sandwichColor: "hsl(321, 70%, 50%)",
    kebab: 122,
    kebabColor: "hsl(102, 70%, 50%)",
    fries: 101,
    friesColor: "hsl(26, 70%, 50%)",
    donut: 191,
    donutColor: "hsl(85, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 101,
    "hot dogColor": "hsl(57, 70%, 50%)",
    burger: 135,
    burgerColor: "hsl(255, 70%, 50%)",
    sandwich: 20,
    sandwichColor: "hsl(153, 70%, 50%)",
    kebab: 50,
    kebabColor: "hsl(260, 70%, 50%)",
    fries: 88,
    friesColor: "hsl(286, 70%, 50%)",
    donut: 136,
    donutColor: "hsl(83, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 126,
    "hot dogColor": "hsl(36, 70%, 50%)",
    burger: 126,
    burgerColor: "hsl(230, 70%, 50%)",
    sandwich: 118,
    sandwichColor: "hsl(157, 70%, 50%)",
    kebab: 124,
    kebabColor: "hsl(297, 70%, 50%)",
    fries: 5,
    friesColor: "hsl(212, 70%, 50%)",
    donut: 58,
    donutColor: "hsl(155, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 115,
    "hot dogColor": "hsl(195, 70%, 50%)",
    burger: 29,
    burgerColor: "hsl(217, 70%, 50%)",
    sandwich: 34,
    sandwichColor: "hsl(136, 70%, 50%)",
    kebab: 137,
    kebabColor: "hsl(260, 70%, 50%)",
    fries: 24,
    friesColor: "hsl(186, 70%, 50%)",
    donut: 37,
    donutColor: "hsl(81, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 173,
    "hot dogColor": "hsl(2, 70%, 50%)",
    burger: 105,
    burgerColor: "hsl(274, 70%, 50%)",
    sandwich: 162,
    sandwichColor: "hsl(290, 70%, 50%)",
    kebab: 37,
    kebabColor: "hsl(124, 70%, 50%)",
    fries: 32,
    friesColor: "hsl(142, 70%, 50%)",
    donut: 77,
    donutColor: "hsl(325, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 128,
    "hot dogColor": "hsl(349, 70%, 50%)",
    burger: 161,
    burgerColor: "hsl(53, 70%, 50%)",
    sandwich: 154,
    sandwichColor: "hsl(176, 70%, 50%)",
    kebab: 33,
    kebabColor: "hsl(139, 70%, 50%)",
    fries: 173,
    friesColor: "hsl(353, 70%, 50%)",
    donut: 64,
    donutColor: "hsl(226, 70%, 50%)",
  },
];
export default function SimpleBackdrop(props) {
  const [boxWidth, setBoxWidth] = useState("40vw");

  useEffect(() => {
    const updateBoxWidth = () => {
      if (window.innerWidth <= 768) {
        setBoxWidth("80vw");
      } else if (window.innerWidth <= 1000) {
        setBoxWidth("70vw");
      } else if (window.innerWidth <= 480) {
        setBoxWidth("90vw");
      } else {
        setBoxWidth("55vw");
      }
    };
    window.addEventListener("resize", updateBoxWidth);
    updateBoxWidth();
    return () => {
      window.removeEventListener("resize", updateBoxWidth);
    };
  }, []);

  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div>
      {console.log(props.dataAsset, props.dataLiability)}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.barGraphIsOpen}
        onClick={props.setBarGraphIsOpen}
      >
        <Box
          sx={{
            width: boxWidth,
            height: "70vh",
            backgroundColor: "white",
            borderRadius: "40px",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={handleBoxClick}
        >
          <Box
            sx={{
              width: "100%",
              height: "70px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              onClick={props.setBarGraphIsOpen}
              sx={{ margin: "15px 30px 15px 15px" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <BarChart data={props.dataLiability} />
        </Box>
      </Backdrop>
    </div>
  );
}
