export const parseQueryString = (queryString) => {
  const paramsArray = queryString.substring(1).split("&");
  return paramsArray.reduce((result, param) => {
    const [key, value] = param.split("=");
    if (key !== "") {
      // only add to result if value is not an empty string
      result[key] = value;
    }
    return result;
  }, {});
};

export const createUrlString = (params) => {
  const url = Object.entries(params)
    .map((e) => e.join("="))
    .join("&");
  return url;
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const copyToClipboard = (str, setIsCopied) => {
  navigator.clipboard
    .writeText(str)
    .then(() => {
      setIsCopied(true);
    })
    .catch((error) => {
      console.error("Failed to copy string: ", error);
    })
    .finally(() => {
      setIsCopied(false);
    });
};

export const handleShare = (data) => {
  const url = createUrlString(data);
  const share_url = `${window.location.href}?${url}`;

  copyToClipboard(share_url);
};

export const calculateEmiOutputs = (data, unit) => {
  const { loan_principal, loan_interest, loan_tenure } = data;

  if (loan_principal && loan_interest && loan_tenure) {
    const P = Math.abs(parseInt(loan_principal));
    const r = Math.abs(parseFloat(loan_interest) / (12 * 100));
    const n = Math.abs(parseInt(loan_tenure)); //*12 when year
    const nYear = Math.abs(parseInt(loan_tenure) * 12);
    const E =
      (P * r * Math.pow(1 + r, unit === "Months" ? n : nYear)) /
      (Math.pow(1 + r, unit === "Months" ? n : nYear) - 1);

    const repaymentTable = [];
    let outstandingPrincipal = P;

    for (let i = 1; unit === "Months" ? i <= n : i <= nYear; i++) {
      const interestComponent = outstandingPrincipal * r;
      const principalComponent = E - interestComponent;
      outstandingPrincipal -= principalComponent;

      const monthly_payment = interestComponent + principalComponent;

      const repaymentRecord = {
        month: i,
        principal: principalComponent.toFixed(2),
        interest: interestComponent.toFixed(2),
        total_payment: monthly_payment.toFixed(2),
        outstandingPrincipal: outstandingPrincipal.toFixed(2),
      };
      repaymentTable.push(repaymentRecord);
    }

    const total_interest_payable = E * (unit === "Months" ? n : nYear) - P;
    const total_payment = P + total_interest_payable;

    return {
      loan_emi: isNaN(E) ? 0 : E.toFixed(2),
      total_interest_payable: isNaN(total_interest_payable)
        ? 0
        : total_interest_payable.toFixed(2),
      total_payment: isNaN(total_payment) ? 0 : total_payment.toFixed(2),
      repayment_table: repaymentTable,
    };
  }
};

export const calculateLoanPrincipalAndInterestPayable = (
  loan_principal,
  total_interest_payable
) => {
  const assets = [
    {
      name: "principal",
      value: Math.abs(parseInt(loan_principal)),
    },
    {
      name: "Interest",
      value: Math.abs(parseInt(total_interest_payable)),
    },
  ];

  const totalVal = assets.reduce(
    (acc, asset, _idx) => acc + parseInt(asset.value),
    0
  );

  return { finalAssets: assets, totalVal };
};
