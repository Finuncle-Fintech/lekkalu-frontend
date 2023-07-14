import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface TableItemProps {
  index: string | number;
  value: string;
  isObject?: boolean;
}

interface TableProps {
  tableHeader: string;
  tableList: any;
  bgHeader: string;
  isObject?: boolean;
}

const TableItem: React.FC<TableItemProps> = ({ index, value, isObject }) => {
  return (
    <div className="flex justify-between items-center py-2 px-2 border-b-[1px] border-solid border-gray text-[12px]">
      <span>{isObject ? index : `Item ${index}`}</span>
      <span>{value}</span>
    </div>
  );
};

const Table: React.FC<TableProps> = ({
  tableHeader,
  tableList,
  bgHeader,
  isObject,
}) => {
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    if (Array.isArray(tableList)) {
      const result = tableList.reduce((acc: number, listItem: string) => {
        return acc + parseInt(listItem);
      }, 0);

      setTotal(result);
    }
  }, [tableList]);

  return (
    <div className="w-[345px] h-[249px] relative">
      <div
        className={`w-full relative flex justify-between items-center py-2 px-3 ${bgHeader} rounded-t-[15px]`}
      >
        <span className="text-white">{tableHeader}</span>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <div className="custom-scrollbar w-full h-[70%] relative overflow-y-scroll">
        {!isObject &&
          tableList.map((item: string, _idx: string | number) => (
            <TableItem index={_idx} value={item} />
          ))}
        {isObject &&
          Object.entries(tableList).map((item) => (
            <TableItem index={item[0]} value={item[1] as string} isObject />
          ))}
      </div>

      {!isObject && (
        <div className="flex justify-between items-center py-2 px-3 border-b-[1px] border-solid border-black text-[12px]">
          <span>Total </span>
          <span>{total}</span>
        </div>
      )}
    </div>
  );
};

export default Table;
