import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pickBy } from "lodash";

import { AssetsLiabilitiesChart } from "../../components/Charts/AssetsLiabilitiesChart";
import "./EmiCalculator.css";
import axios from "axios";

let defaultData = {
  loan_principal: "0",
  loan_interest: "0",
  loan_tenure: "0",
  emi_day: "",
  disbursement_date: "",
};

const defaultResults = {
  loan_emi: "0",
  total_interest_payable: "0",
  total_payment: "0",
};

const optionsPrincipal = [
  "0",
  "1000",
  "2000",
  "3000",
  "4000",
  "5000",
  "6000",
  "7000",
  "8000",
  "9000",
  "10000",
];

const optionsInterest = [
  "0",
  "10",
  "20",
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "100",
];

const optionsMonth = ["0", "5", "10", "15", "20", "25", "30"];

const FormInput = ({
  handleChange,
  value,
  options,
  name,
  type,
  label,
  symbol,
  min,
  max,
  step,
  showSlider,
}) => {
  return (
    <div className="parent">
      <div className="input-container">
        {label && <h1>{label}</h1>}
        <div className="input-field">
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
          />
          <button>{symbol}</button>
        </div>
      </div>
      {showSlider && (
        <>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            list={name}
            defaultValue={value}
            name={name}
            onChange={handleChange}
          />
          <datalist id={name}>
            {options.map((value, _idx) => (
              <option key={_idx} value={value}></option>
            ))}
          </datalist>
        </>
      )}
    </div>
  );
};

const DisplayResult = ({ value, label }) => {
  const formatNumberWithCommas = (x) =>
    x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <section className="result">
      <h4>{label}</h4>
      <p>{`$${formatNumberWithCommas(value)}`}</p>
    </section>
  );
};

const EmiCalculator = () => {
  const location = useLocation();
  defaultData = parseQueryString(location.search);

  const [data, setData] = useState(defaultData);
  const [results, setResults] = useState(defaultResults);
  const [assets, setAssets] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  function parseQueryString(queryString) {
    const paramsArray = queryString.substring(1).split("&");
    return paramsArray.reduce((result, param) => {
      const [key, value] = param.split("=");
      result[key] = value;
      return result;
    }, {});
  }

  const createUrlString = (params) => {
    const validParams = pickBy(params, (value) => !!value);
    const url = Object.entries(validParams)
      .map((e) => e.join("="))
      .join("&");
    return url;
  };

  const handleSave = async () => {
    if (!Object.values(data).every(Boolean)) {
      alert("Form Not Completely Filled");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API}expenses/`, data, {
        auth: {
          username: process.env.REACT_APP_USER,
          password: process.env.REACT_APP_PASSWORD,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred during API call.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (str)=> {
  navigator.clipboard.writeText(str)
    .then(() => {
      console.log("String copied to clipboard!");
    })
    .catch((error) => {
      console.error("Failed to copy string: ", error);
    });
  }
  
  const handleShare = (data) => {
    const url = createUrlString(data);
    const share_url = `${window.location.href}?${url}`;

    copyToClipboard(share_url);
  };

  useEffect(() => {
    const { loan_principal, loan_interest, loan_tenure } = data;

    if (loan_principal && loan_interest && loan_tenure) {
      const P = parseInt(loan_principal);
      const r = parseFloat(loan_interest) / (12 * 100);
      const n = parseInt(loan_tenure);
      const E = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

      const total_interest_payable = E.toFixed(2) * n - P;
      const total_payment = P + total_interest_payable;

      setResults({
        loan_emi: isNaN(E) ? 0 : E.toFixed(2),
        total_interest_payable: isNaN(total_interest_payable)
          ? 0
          : total_interest_payable.toFixed(2),
        total_payment: isNaN(total_payment) ? 0 : total_payment.toFixed(2),
      });
    }
  }, [data]);

  useEffect(() => {
    const { loan_principal } = data;
    const { total_interest_payable } = results;

    const assets = [
      {
        name: "principal",
        value: parseInt(loan_principal),
      },
      {
        name: "Interest",
        value: parseInt(total_interest_payable),
      },
    ];

    const totalVal = assets.reduce(
      (acc, asset, _idx) => acc + parseInt(asset.value),
      0
    );

    setAssets({ finalAssets: assets, totalVal });
  }, [data, results]);

  return (
    <div className="container">
      <div className="buttons">
        <button className="save" onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button className="save" onClick={() => handleShare(data)}>
          share
        </button>
      </div>
      <div>
        <FormInput
          handleChange={handleChange}
          value={data.loan_principal}
          options={optionsPrincipal}
          name="loan_principal"
          type="number"
          label="Loan Principal"
          symbol="$"
          min="0"
          max={"10000"}
          step="10"
          showSlider
        />
        <FormInput
          handleChange={handleChange}
          value={data.loan_interest}
          options={optionsInterest}
          name="loan_interest"
          type="number"
          label="Loan Interest"
          symbol="%"
          min="0"
          max={"100"}
          step="1"
          showSlider
        />
      </div>
      <FormInput
        handleChange={handleChange}
        value={data.loan_tenure}
        options={optionsMonth}
        name="loan_tenure"
        type="number"
        label="Loan Tenure"
        symbol="Month"
        min="0"
        max={"30"}
        step="1"
        showSlider
      />

      <div>
        <FormInput
          handleChange={handleChange}
          value={data.disbursement_date}
          name="disbursement_date"
          type="date"
          symbol="Date"
        />
        <FormInput
          handleChange={handleChange}
          value={data.emi_day}
          name="emi_day"
          type="number"
          symbol="EMI Day"
        />
      </div>
      <div className="output">
        <div className="output-text">
          <DisplayResult value={results.loan_emi} label="Loan EMI" />
          <DisplayResult
            value={results.total_interest_payable}
            label="Total Interest Payable"
          />
          <DisplayResult value={results.total_payment} label="Total Payment" />
        </div>
        <div className="output-chart">
          {assets && <AssetsLiabilitiesChart data={assets} type={"assets"} />}
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
