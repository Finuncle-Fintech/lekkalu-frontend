import { useCallback, useEffect, useState } from "react";
import { DEFAULT_CURRENCY } from "utils/Constants";

const USER_PREFERENCE_KEY = "user-preferences";

export function useUserPreferences() {
  const [preferences, setPreferences] = useState({
    currencyUnit: DEFAULT_CURRENCY,
  });

  useEffect(function setUserPreferencesFromLocalStorage() {
    const localPreferences = localStorage.getItem(USER_PREFERENCE_KEY);
    if (localPreferences) {
      setPreferences(JSON.parse(localPreferences));
    }
  }, []);

  const savePreferences = useCallback(() => {
    localStorage.setItem(USER_PREFERENCE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  return {
    preferences,
    setPreferences,
    savePreferences,
  };
}
