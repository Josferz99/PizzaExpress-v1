'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CreditCard,
  Banknote,
  QrCode,
  LoaderCircle,
  ArrowRight,
  Store,
  MapPin,
} from 'lucide-react'
import { useOrder } from '@/lib/order-store'
import { formatCurrency } from '@/lib/data'
import { cn } from '@/lib/utils'

const methods = [
  { id: 'tarjeta', label: 'Tarjeta', icon: CreditCard },
  { id: 'efectivo', label: 'Efectivo', icon: Banknote },
  { id: 'qr', label: 'QR / App', icon: QrCode },
]

const tips = [0, 5, 10, 15]

export function Cobro() {
  const router = useRouter()
  const {
    items,
    target,
    subtotal,
    tax,
    total,
    orderNumber,
    setPaymentMethod,
  } = useOrder()
  const [method, setMethod] = useState('tarjeta')
  const [tip, setTip] = useState(0)
  const [loading, setLoading] = useState(false)

  if (items.length === 0) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
        <p className="font-medium">No hay nada para cobrar</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Crea una comanda primero.
        </p>
        <Link
          href="/nuevo-pedido"
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Nuevo pedido <ArrowRight className="size-4" />
        </Link>
      </div>
    )
  }

  const tipAmount = (subtotal * tip) / 100
  const grandTotal = total + tipAmount

  const handlePay = () => {
    setLoading(true)
    setPaymentMethod(method)
    setTimeout(() => router.push('/confirmacion'), 900)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Método de pago</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {methods.map((m) => {
              const Icon = m.icon
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors',
                    method === m.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon className="size-6" />
                  <span className="text-sm font-medium">{m.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Propina</h2>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {tips.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTip(t)}
                className={cn(
                  'rounded-xl border-2 py-3 text-sm font-semibold transition-colors',
                  tip === t
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {t === 0 ? 'Sin propina' : `${t}%`}
              </button>
            ))}
          </div>
        </div>

        {method === 'efectivo' && (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-semibold">Efectivo recibido</h2>
            <input
              type="number"
              placeholder={grandTotal.toFixed(2)}
              className="mt-3 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Ingresa el importe para calcular el cambio.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Comanda {orderNumber}</h2>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              {target.type === 'mesa' ? (
                <>
                  <Store className="size-4" /> Mesa {target.table}
                </>
              ) : (
                <>
                  <MapPin className="size-4" /> Delivery
                </>
              )}
            </span>
          </div>
          <div className="mt-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>IVA (10%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Propina ({tip}%)</span>
              <span>{formatCurrency(tipAmount)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-70"
        >
          {loading && <LoaderCircle className="size-4 animate-spin" />}
          {loading ? 'Procesando…' : `Cobrar ${formatCurrency(grandTotal)}`}
        </button>
      </div>
    </div>
  )
}
