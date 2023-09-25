import { useContext, useEffect, useState } from "react";
import { Context } from "provider/Provider";
import { Box } from "@mui/material";
import GraphCard from "components/BalanceSheet/GraphCard";
import BarGraph from "components/BalanceSheet/BarGraph";



export default function BalanceSheet() {
  const { assets, liabilities, fetchData } = useContext(Context);
  const [barGraphIsOpen, setBarGraphIsOpen] = useState(false)
  const assetDatas = [];
  const liabilityDatas = [];

  useEffect(() => {
    fetchData();
  }, []);


  if (assets.finalAssets && assets.finalAssets.length > 0) {
    assets.finalAssets.forEach((asset) =>
      assetDatas.push({ id: asset.name, label: asset.name, value: asset.value })
    );
  }

  if (liabilities.finalLiabilities && liabilities.finalLiabilities.length > 0) {
    liabilities.finalLiabilities.forEach((liability) =>
      liabilityDatas.push({
        id: liability.name,
        label: liability.name,
        value: liability.value,
      })
    );
  }

  const handleOpen = () => {
    setBarGraphIsOpen(true);
  }
  const handleClose = () => {
    setBarGraphIsOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "200vh",
          backgroundColor: "primary.main",
          padding: "1% 5% 0 5%",
        }}
      >
        <GraphCard assetDatas={assetDatas} liabilityDatas={liabilityDatas} setBarGraphIsOpen={handleOpen} />
        { barGraphIsOpen ? <BarGraph setBarGraphIsOpen={handleClose} barGraphIsOpen={barGraphIsOpen} /> : null}
      </Box>
    </>
  );
}
