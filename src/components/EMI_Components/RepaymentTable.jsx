const RepaymentTable = ({ repaymentTable }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Principal</th>
          <th>Interest</th>
          <th>Total Payment</th>
          <th>Outstanding Principal</th>
        </tr>
      </thead>
      <tbody>
        {repaymentTable.map((record) => (
          <tr key={record.month}>
            <td>{Math.abs(record.month)}</td>
            <td>{Math.abs(record.principal)}</td>
            <td>{Math.abs(record.interest)}</td>
            <td>{Math.abs(record.total_payment)}</td>
            <td>{Math.abs(record.outstandingPrincipal)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RepaymentTable;