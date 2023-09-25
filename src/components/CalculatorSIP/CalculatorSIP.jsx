import { Button, Slider, TextField } from "@mui/material";
import { useUserPreferences } from "hooks/useUserPreferences";
import { useState } from "react";

export default function CalculatorSIP({ setSummary }) {
  const [values, setValues] = useState({
    monthlyAmount: 500,
    durationInvestment: 1,
    rateReturn: 1,
  });
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

  const calculateSIP = (e) => {
    e.preventDefault();
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
    setSummary(value);
    setError(false);
  };

  return (
    <form onSubmit={calculateSIP}>
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

      <Button variant="contained" type="submit" color="primary">
        Calculate
      </Button>
    </form>
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
