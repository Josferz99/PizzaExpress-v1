'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CurrencyCode = 'EUR' | 'USD' | 'PYG'

type CurrencyConfig = {
  code: CurrencyCode
  label: string
  symbol: string
  flag: string
  locale: string
  /** Conversion rate from the base currency (EUR). */
  rate: number
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  EUR: {
    code: 'EUR',
    label: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    locale: 'es-ES',
    rate: 1,
  },
  USD: {
    code: 'USD',
    label: 'Dólar EE. UU.',
    symbol: '$',
    flag: '🇺🇸',
    locale: 'en-US',
    rate: 1.08,
  },
  PYG: {
    code: 'PYG',
    label: 'Guaraní',
    symbol: '₲',
    flag: '🇵🇾',
    locale: 'es-PY',
    rate: 8100,
  },
}

export const CURRENCY_LIST = Object.values(CURRENCIES)

const STORAGE_KEY = 'pizzaexpress:currency'

type CurrencyContextValue = {
  currency: CurrencyCode
  config: CurrencyConfig
  setCurrency: (code: CurrencyCode) => void
  /** Formats an amount expressed in the base currency (EUR) into the active currency. */
  format: (baseValue: number) => string
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('EUR')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && stored in CURRENCIES) {
      setCurrencyState(stored as CurrencyCode)
    }
  }, [])

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code)
    window.localStorage.setItem(STORAGE_KEY, code)
  }, [])

  const config = CURRENCIES[currency]

  const format = useCallback(
    (baseValue: number) => {
      const converted = baseValue * config.rate
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.code,
        maximumFractionDigits: config.code === 'PYG' ? 0 : 2,
      }).format(converted)
    },
    [config],
  )

  const value = useMemo<CurrencyContextValue>(
    () => ({ currency, config, setCurrency, format }),
    [currency, config, setCurrency, format],
  )

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
