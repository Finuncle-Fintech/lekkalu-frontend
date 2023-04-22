const DisplayResult = ({ value, label }) => {
  const formatNumberWithCommas = (x) =>
    x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <section className="result">
      <h4>{label}</h4>
      <p>{value ? `${formatNumberWithCommas(value)}`: "0" }</p>
    </section>
  );
};

export default DisplayResult;
