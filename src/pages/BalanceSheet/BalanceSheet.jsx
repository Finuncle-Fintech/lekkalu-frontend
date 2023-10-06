import { useContext, useEffect, useState } from "react";
import { Context } from "provider/Provider";
import { Box } from "@mui/material";
import GraphCard from "components/BalanceSheet/GraphCard";
import AssetCard from "components/BalanceSheet/AssetCard";
import LiabilitiesCard from "components/BalanceSheet/LiabilitiesCard";
import BarGraph from "components/BalanceSheet/BarGraph";

export default function BalanceSheet() {
  const { assets, liabilities } =
    useContext(Context);

  const [barGraphIsOpen, setBarGraphIsOpen] = useState(false);
  const [assetDatas, setAssetDatas] = useState([]);
  const [liabilityDatas, setLiabilityDatas] = useState([]);




  useEffect(() => {
    if (assets.finalAssets && assets.finalAssets.length > 0) {
      const newAssetDatas = assets.finalAssets.map((asset) => ({
        id: asset.id,
        label: asset.name,
        value: asset.value,
      }));
      setAssetDatas(newAssetDatas);
    }
  }, [assets]);

  useEffect(() => {
    if (
      liabilities.finalLiabilities &&
      liabilities.finalLiabilities.length > 0
    ) {
      const newLiabilityDatas = liabilities.finalLiabilities.map(
        (liability) => ({
          id: liability.id,
          label: liability.name,
          value: liability.value,
          principal: liability.principal,
          interest: liability.interest,
          tenure: liability.tenure,
          closure_charges: liability.closure_charges,
          disbursement_date: liability.disbursement_date,
        })
      );
      setLiabilityDatas(newLiabilityDatas);
    }
  }, [liabilities]);

  const handleOpen = () => {
    setBarGraphIsOpen(true);
  };
  const handleClose = () => {
    setBarGraphIsOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "350vh",
          backgroundColor: "primary.main",
          padding: "1% 5% 0 5%",
        }}
      >
        <GraphCard
          assetDatas={assets}
          liabilityDatas={liabilities}
          setBarGraphIsOpen={handleOpen}
        />
        {barGraphIsOpen ? (
          <BarGraph
            setBarGraphIsOpen={handleClose}
            barGraphIsOpen={barGraphIsOpen}
            dataAsset={assetDatas}
            dataLiability={liabilityDatas}
          />
        ) : null}
        <AssetCard assetDatas={assetDatas} />
        <LiabilitiesCard liabilityDatas={liabilityDatas} />
      </Box>
    </>
  );
}
