'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Coins } from 'lucide-react'
import { CURRENCY_LIST, useCurrency, type CurrencyCode } from '@/lib/currency'
import { cn } from '@/lib/utils'

export function CurrencySelector() {
  const { currency, config, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function select(code: CurrencyCode) {
    setCurrency(code)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Seleccionar moneda"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
      >
        <Coins className="size-4 text-muted-foreground" />
        <span className="tabular-nums">{config.symbol}</span>
        <span className="hidden sm:inline">{config.code}</span>
        <ChevronDown
          className={cn(
            'size-4 text-muted-foreground transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-12 z-20 w-56 overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-lg"
        >
          {CURRENCY_LIST.map((c) => {
            const active = c.code === currency
            return (
              <li key={c.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => select(c.code)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted',
                  )}
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="flex-1">
                    <span className="font-medium">{c.label}</span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      {c.code}
                    </span>
                  </span>
                  <span className="w-4 tabular-nums text-muted-foreground">
                    {c.symbol}
                  </span>
                  {active && <Check className="size-4" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
