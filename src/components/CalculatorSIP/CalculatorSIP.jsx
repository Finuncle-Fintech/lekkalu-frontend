import { Button, Slider, TextField } from "@mui/material";
import {
  isObjectEmpty,
  parseQueryString,
} from "components/EMI_Components/utils";
import { useUserPreferences } from "hooks/useUserPreferences";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { parseNumbers } from "utils/Number";

const DEFAULT_DATA = {
  monthlyAmount: 500,
  durationInvestment: 1,
  rateReturn: 1,
};

export default function CalculatorSIP({ setSummary }) {
  const location = useLocation();
  const parsedObject = parseQueryString(location.search);
  const parsedNumbers = parseNumbers(parsedObject);
  const [values, setValues] = useState(
    !isObjectEmpty(parsedNumbers) ? parsedNumbers : DEFAULT_DATA
  );
  const [errors, setError] = useState(false);
  const { preferences } = useUserPreferences();

  const inputs = [
    {
      id: "monthlyAmount",
      label: `Monthly investment amount (${preferences?.currencyUnit})`,
      type: "number",
      range: {
        min: 500,
        max: 100_000,
      },
      step: 500,
    },
    {
      id: "durationInvestment",
      label: "Duration of the investment (Yr)",
      type: "number",
      range: {
        min: 1,
        max: 40,
      },
      step: 1,
    },
    {
      id: "rateReturn",
      label: "Expected annual return (%)",
      type: "number",
      range: {
        min: 1,
        max: 30,
      },
      step: 0.1,
    },
  ];

  const handleValueChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const calculateSIP = useCallback(() => {
    const { monthlyAmount, durationInvestment, rateReturn } = values;

    if (!monthlyAmount || !durationInvestment || !rateReturn) {
      setError({
        monthlyAmount: !monthlyAmount,
        durationInvestment: !durationInvestment,
        rateReturn: !rateReturn,
      });
      setSummary([]);
      return;
    }
    const value = getFinalValue(monthlyAmount, durationInvestment, rateReturn);
    setSummary({ ...values, ...value });
    setError(false);
  }, [setSummary, values]);

  useEffect(() => {
    calculateSIP();
  }, [calculateSIP]);

  return (
    <div
      className="d-grid gap-4 w-100"
      style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
    >
      {inputs.map((input) => (
        <div>
          <TextField
            name={input.id}
            error={errors[input.id]}
            value={values[input.id]}
            onChange={handleValueChange}
            label={input.label}
            type={input.type}
            fullWidth
          />

          <Slider
            min={input.range.min}
            max={input.range.max}
            step={input.step}
            value={values[input.id]}
            name={input.id}
            onChange={handleValueChange}
          />
        </div>
      ))}
    </div>
  );
}

const getFinalValue = (monthlyAmount, durationInvestment, rateReturn) => {
  const months = durationInvestment * 12;
  const rateMonth = rateReturn / 100 / 12;

  const totalInvested = monthlyAmount * months;

  let finalValue =
    (monthlyAmount * (Math.pow(1 + rateMonth, months) - 1)) / rateMonth;

  finalValue = parseInt(finalValue.toFixed(0));
  const wealthGained = finalValue - totalInvested;

  return { totalInvested, finalValue, wealthGained };
};
