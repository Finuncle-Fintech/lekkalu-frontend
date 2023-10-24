import { useEffect, useRef } from 'react'

export function useEffectOnce(callback: React.EffectCallback) {
  const hasRunOnce = useRef(false)

  useEffect(() => {
    if (!hasRunOnce.current) {
      callback()
      hasRunOnce.current = true
    }
    // eslint-disable-next-line
  }, [])
}
