import { clsx, type ClassValue } from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const preventPropagationOnEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
  if (event.key === 'Enter') event.preventDefault()
}
