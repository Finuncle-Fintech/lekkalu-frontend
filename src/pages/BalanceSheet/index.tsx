/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

//components
import BreadCrumb from '../../components/BreadCrumb';
import Table from '../../components/Table';
import { AssetsLiabilitiesChart } from '../../components/Charts/AssetsLiabilitiesChart';
import { BeatLoader } from 'react-spinners';
import Colors from '../../constants/colors';
import { useGetAssets } from '../../utils/hooks';

interface AssetsProps {
  name: string;
  value: number;
}

const TableItemList: string[] = [
  '123',
  '4.57k',
  '89',
  '12L',
  '45k',
  '65L',
  '100k',
  '120k',
];

const summaryStatisticsList = {
  Equity: '25.6L',
  'Cash Reserve': '6.55L',
  'Survival Months': '3.2',
  'Asset Roi': '1.29%',
  'Liability Interest': '8.56%',
};

const summaryStatisticsListTwo = {
  Alpha: '-7.27%',
  'NPA Assets': '56%',
};

const BalanceSheet: React.FC = () => {
  // assets
  const [finalAssets, setFinalAssets] = useState<AssetsProps[]>([]);
  const [totalValue, setTotalValue] = useState<number>();

  const { assets, loading: loadingAssets } = useGetAssets();

  // handles manipulation on assets data
  useEffect(() => {
    const finalData: AssetsProps[] = [];
    let totalData: number = 0;
    if (assets) {
      totalData = assets.reduce(
        (acc: number, data: { name: string; market_value: number }) => {
          finalData.push({
            name: data.name,
            value: data.market_value,
          });
          return acc + data.market_value;
        },
        0.000000001,
      );
    }
    setFinalAssets([...finalAssets, ...finalData]);
    setTotalValue(totalData);
  }, [assets]);

  return (
    <div className="w-full relative">
      <BreadCrumb pageTitle="Balance Sheet" />
      <div className="grid grid-cols-6 w-[80%] mx-auto gap-3 mt-4">
        <div className="bg-[#D9D9D9] col-span-2 hidden md:block"></div>
        <div className="col-span-6 md:col-span-4 place-items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative place-items-center">
            <Table
              bgHeader="bg-[#62D4E3]"
              tableList={TableItemList}
              tableHeader="Assets"
            />
            <Table
              bgHeader="bg-[#E362BF]"
              tableList={TableItemList}
              tableHeader="Liabilities"
            />
            <div className="w-full relative">
              {/* Assets */}
              {loadingAssets ? (
                <div className="w-1/2 bg-black mx-auto py-8 my-4 flex justify-center">
                  <BeatLoader color={Colors.loaderColor} />
                </div>
              ) : (
                <AssetsLiabilitiesChart
                  data={{ totalVal: totalValue, finalAssets: finalAssets }}
                  type={'assets'}
                />
              )}
            </div>
            <div className="w-full relative">
              {/* Assets */}
              {loadingAssets ? (
                <div className="w-1/2 bg-black mx-auto py-8 my-4 flex justify-center">
                  <BeatLoader color={Colors.loaderColor} />
                </div>
              ) : (
                <AssetsLiabilitiesChart
                  data={{ totalVal: totalValue, finalAssets: finalAssets }}
                  type={'assets'}
                />
              )}
            </div>
            <Table
              bgHeader="bg-[#E362BF]"
              tableList={summaryStatisticsList}
              tableHeader="summary statistics"
              isObject
            />
            <Table
              bgHeader="bg-[#E362BF]"
              tableList={summaryStatisticsListTwo}
              tableHeader="summary statistics"
              isObject
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheet;
