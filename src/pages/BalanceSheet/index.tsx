import React from 'react';

//components
import BreadCrumb from '../../components/BreadCrumb';
import Table from '../../components/Table';

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

const BalanceSheet: React.FC = () => {
  return (
    <div className="w-full relative">
      <BreadCrumb pageTitle="Balance Sheet" />
      <div className="grid grid-cols-6 w-[80%] mx-auto gap-3 mt-4">
        <div className="bg-[#D9D9D9] col-span-2"></div>
        <div className="col-span-4 place-items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Table
              bgHeader="bg-[#E362BF]"
              tableList={summaryStatisticsList}
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
