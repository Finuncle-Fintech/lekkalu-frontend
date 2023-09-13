import {
  Button,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import styles from "./Settings.module.css";
import { CURRENCY_PREFERENCES } from "utils/Settings";

export default function Settings() {
  return (
    <div className={styles.settings_container}>
      <div className={styles.heading}>Manage your preferences</div>
      <div className={styles.divider}></div>

      <div className={styles.grid}>
        <FormControl>
          <TextField id="username" label="Username" variant="outlined" />
        </FormControl>

        <FormControl>
          <InputLabel>Currency Unit</InputLabel>
          <Select id="currencyUnit" label="Currency Unit">
            {Object.entries(CURRENCY_PREFERENCES).map(([label, value]) => (
              <MenuItem value={value}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <TextField
            id="monthlyBudger"
            label="Monthly Budget"
            variant="outlined"
            type="number"
          />
        </FormControl>

        <FormControl>
          <InputLabel>Theme</InputLabel>
          <Select id="theme" label="Theme">
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="system">System Preference</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Enable automatic data backup"
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Enable email notifications"
        />
      </div>

      <Button variant="contained">Save Preferences</Button>
    </div>
  );
}
