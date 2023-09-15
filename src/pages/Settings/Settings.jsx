import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import styles from "./Settings.module.css";
import { CURRENCY_PREFERENCES } from "utils/Settings";
import { useUserPreferences } from "hooks/useUserPreferences";

export default function Settings() {
  const { preferences, setPreferences, savePreferences } = useUserPreferences();

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
            {Object.entries(CURRENCY_PREFERENCES).map(([label, value]) => (
              <MenuItem value={value}>{label}</MenuItem>
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
