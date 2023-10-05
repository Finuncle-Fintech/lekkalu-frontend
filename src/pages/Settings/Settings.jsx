import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import styles from "./Settings.module.css";
import { useUserPreferences } from "hooks/useUserPreferences";
import { getCountryList } from "country-data-codes";
import { useMemo } from "react";
import { uniqBy } from "lodash";

export default function Settings() {
  const { preferences, setPreferences, savePreferences } = useUserPreferences();

  const currencyCodes = useMemo(() => {
    const countryList = getCountryList();
    const currencyList = countryList
      .map((item) => ({
        name: item.currency.name,
        symbol: item.currency.symbol,
      }))
      .filter((item) => Boolean(item.symbol));

    return uniqBy(currencyList, (currency) => currency.symbol);
  }, []);

  const handleValueChange = (e) => {
    setPreferences((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={styles.settings_container}>
      <div className={styles.heading}>Manage your preferences</div>
      <div className={styles.divider}></div>

      <div className={styles.grid}>
        <FormControl>
          <InputLabel>Currency Unit</InputLabel>
          <Select
            value={preferences.currencyUnit}
            name="currencyUnit"
            label="Currency Unit"
            onChange={handleValueChange}
          >
            {currencyCodes.map(({ name, symbol }) => (
              <MenuItem value={symbol}>
                {name} ({symbol})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Button
        variant="contained"
        onClick={() => {
          savePreferences();
        }}
      >
        Save Preferences
      </Button>
    </div>
  );
}
