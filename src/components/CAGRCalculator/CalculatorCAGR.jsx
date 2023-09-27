import { Button, Slider, TextField } from "@mui/material";
import { useUserPreferences } from "hooks/useUserPreferences";
import { useState } from "react";

export default function CalculatorCAGR({ setSummary }) {
  const [values, setValues] = useState({
    initialVal: 5000,
    finalVal: 25000,
    durationInvestment: 5,
  });

  const [errors, setErrors] = useState(false);
  const { preferences } = useUserPreferences();

  const inputs = [
    {
      id: "initialVal",
      label: `Initial value (${preferences?.currencyUnit})`,
      type: "number",
      range: {
        min: 1000,
        max: 100_000_00,
      },
      step: 500,
    },
    {
      id: "finalVal",
      label: `Final Value Costs (${preferences?.currencyUnit})`,
      type: "number",
      range: {
        min: 1000,
        max: 100_000_00,
      },
      step: 500,
    },
    {
      id: "durationInvestment",
      label: "Duration of Investment (Years)",
      type: "number",
      range: {
        min: 1,
        max: 40,
      },
      step: 1,
    },
  ];

  const handleValueChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    const { initialVal, finalVal, durationInvestment } = values;
    if (!initialVal || !finalVal || !durationInvestment) {
      setErrors({
        initialVal: !initialVal,
        finalVal: !finalVal,
        durationInvestment: !durationInvestment,
      });
      setSummary([]);
      return;
    }

    const { initialValNum, finalValNum, CAGRPercentage } = getCAGR(
      initialVal,
      finalVal,
      durationInvestment
    );
    setSummary([
      [
        {
          name: "Inital Value",
          value: initialValNum,
        },
        {
          name: "Final Value",
          value: finalValNum,
        },
      ],
      CAGRPercentage,
    ]);
    setErrors(false);
  };

  return (
    <form onSubmit={handleCalculate}>
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

const minusChecker = (e, setState) => {
  const value = e.target.value;
  if (value.includes("-") || isNaN(value)) return;
  setState(value);
};

const getCAGR = (initialVal, finalVal, durationInvestment) => {
  const initialValNum = parseFloat(initialVal);
  const finalValNum = parseFloat(finalVal);
  const durationInvestmentNum = parseInt(durationInvestment);

  const CAGRPercentage = (
    (Math.pow(finalValNum / initialValNum, 1 / durationInvestmentNum) - 1) *
    100
  ).toFixed(2);

  return { CAGRPercentage, durationInvestment, finalValNum, initialValNum };
};
