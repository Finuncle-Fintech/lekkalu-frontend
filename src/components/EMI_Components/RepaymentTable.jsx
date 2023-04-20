const RepaymentTable = ({ repaymentTable }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>{`Principal ($)`}</th>
          <th>{`Interest ($)`}</th>
          <th>{`Total Payment ($)`}</th>
          <th>{`Outstanding Principal ($)`}</th>
        </tr>
      </thead>
      <tbody>
        {repaymentTable.map((record) => (
          <tr key={record.month}>
            <td>{record.month}</td>
            <td>{record.principal}</td>
            <td>{record.interest}</td>
            <td>{record.total_payment}</td>
            <td>{record.outstandingPrincipal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RepaymentTable;