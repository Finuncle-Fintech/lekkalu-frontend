import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_CURRENCY } from 'utils/Constants'
import Swal from 'sweetalert2'

const USER_PREFERENCE_KEY = 'user-preferences'

export function useUserPreferences() {
  const [preferences, setPreferences] = useState({
    currencyUnit: DEFAULT_CURRENCY,
  })

  useEffect(function setUserPreferencesFromLocalStorage() {
    const localPreferences = localStorage.getItem(USER_PREFERENCE_KEY)
    if (localPreferences) {
      setPreferences(JSON.parse(localPreferences))
    }
  }, [])

  const savePreferences = useCallback(() => {
    localStorage.setItem(USER_PREFERENCE_KEY, JSON.stringify(preferences))

    Swal.fire({
      title: 'Successfully updated your preferences.',
      icon: 'success',
    })
  }, [preferences])

  return {
    preferences,
    setPreferences,
    savePreferences,
  }
}
