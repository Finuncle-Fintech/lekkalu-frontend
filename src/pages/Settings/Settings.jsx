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
import { useContext, useMemo } from "react";
import { uniqBy } from "lodash";
import Swal from "sweetalert2";
import { Context } from "provider/Provider";
import { useNavigate } from "react-router";

export default function Settings() {
  const { preferences, setPreferences, savePreferences } = useUserPreferences();
  const { user, authToken } = useContext(Context)
  const navigate = useNavigate();

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

  const handlerDeleteAccount = () => {
    Swal.fire({
      title: 'Are you sure you want to delete this account?',
      text: 'This action cannot be reverted.',
      input: 'password',
      inputPlaceholder: 'Put your password to confirm this action.',
      showCancelButton: true,
      confirmButtonText: "I'm sure",
      confirmButtonColor: 'red',
      color: 'black',
      preConfirm: async(password) => {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user.username,
            password: password
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value?.refresh && result.value?.access) {
          fetch(`${process.env.REACT_APP_BACKEND_API}v1/accounts/${user.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            }
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              navigate('/signin')
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  return (
    <div className={styles.settings_container}>
      <div>

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
                <MenuItem value={symbol} key={name}>
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
          Update
        </Button>

      </div>

      <div>

        <div className={styles.heading}>Account settings</div>
        <div className={styles.divider}></div>

        <Button
          variant="outlined"
          color="error"
          onClick={handlerDeleteAccount}
        >
          Delete this account
        </Button>

      </div>



    </div>

  );
}
