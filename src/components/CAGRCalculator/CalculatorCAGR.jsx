import { Button, TextField } from "@mui/material";
import { useUserPreferences } from "hooks/useUserPreferences";
import { useState } from "react";

export default function CalculatorCAGR({ setSummary }) {
  const [initialVal, setInitialVal] = useState("");
  const [finalVal, setFinalVal] = useState("");
  const [durationInvestment, setDurationInvestment] = useState("");
  const [error, setError] = useState(false);
  const { preferences } = useUserPreferences();

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!initialVal || !finalVal || !durationInvestment) {
      setError({
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
    setError(false);
  };

  return (
    <form
      action=""
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: ".7rem",
      }}
      onSubmit={(e) => handleCalculate(e)}
    >
      <TextField
        value={initialVal}
        error={error.initialVal}
        onChange={(e) => minusChecker(e, setInitialVal)}
        label={`Initial value (${preferences?.currencyUnit})`}
      />
      <TextField
        value={finalVal}
        error={error.finalVal}
        onChange={(e) => minusChecker(e, setFinalVal)}
        label={`Final Value Costs (${preferences?.currencyUnit})`}
      />
      <TextField
        value={durationInvestment}
        error={error.durationInvestment}
        onChange={(e) => minusChecker(e, setDurationInvestment)}
        label="Duration of Investment (Years)"
      />
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
