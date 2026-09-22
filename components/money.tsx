'use client'

import { useCurrency } from '@/lib/currency'

export function Money({ value }: { value: number }) {
  const { format } = useCurrency()
  return <>{format(value)}</>
}
