import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import {
  optionsPrincipal,
  optionsInterest,
  optionsMonth,
} from "components/EMI_Components/constant";
import {
  parseQueryString,
  handleShare,
  calculateEmiOutputs,
  calculateLoanPrincipalAndInterestPayable,
} from "components/EMI_Components/utils";
import FormInput from "components/EMI_Components/FormInput";
import DisplayResult from "components/EMI_Components/DisplayResult";
import RepaymentTable from "components/EMI_Components/RepaymentTable";
import { AssetsLiabilitiesChart } from "../../components/Charts/AssetsLiabilitiesChart";

import "./EmiCalculator.css";

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
  repayment_table: [],
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

  useEffect(() => {
    setResults(calculateEmiOutputs(data));
  }, [data]);

  useEffect(() => {
    setAssets(
      calculateLoanPrincipalAndInterestPayable(
        data?.loan_principal,
        results?.total_interest_payable
      )
    );
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
          <DisplayResult value={results?.loan_emi} label="Loan EMI" />
          <DisplayResult
            value={results?.total_interest_payable}
            label="Total Interest Payable"
          />
          <DisplayResult value={results?.total_payment} label="Total Payment" />
        </div>
        <div className="output-chart">
          {assets && <AssetsLiabilitiesChart data={assets} type={"assets"} />}
        </div>
      </div>

      <div className="table-container">
        {results?.repayment_table && results.repayment_table.length > 0 && (
          <RepaymentTable repaymentTable={results.repayment_table} />
        )}
      </div>
    </div>
  );
};

export default EmiCalculator;
