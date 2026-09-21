'use client'

import Link from 'next/link'
import { CheckCircle2, Printer, Home, PlusCircle } from 'lucide-react'
import { useOrder } from '@/lib/order-store'
import { formatCurrency } from '@/lib/data'

const methodLabels: Record<string, string> = {
  tarjeta: 'Tarjeta',
  efectivo: 'Efectivo',
  qr: 'QR / App',
}

export function Confirmacion() {
  const { items, target, total, orderNumber, paymentMethod, clear } = useOrder()

  return (
    <div className="mx-auto max-w-md">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col items-center gap-3 bg-secondary/10 px-6 py-8 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-md">
            <CheckCircle2 className="size-9" />
          </span>
          <div>
            <p className="text-xl font-bold">¡Pago realizado!</p>
            <p className="text-sm text-muted-foreground">
              Comanda {orderNumber} cobrada correctamente
            </p>
          </div>
        </div>

        <div className="space-y-3 p-6">
          <Row label="Destino" value={target.type === 'mesa' ? `Mesa ${target.table}` : 'Delivery'} />
          <Row label="Productos" value={`${items.length} líneas`} />
          <Row
            label="Método de pago"
            value={paymentMethod ? methodLabels[paymentMethod] ?? paymentMethod : '—'}
          />
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="font-semibold">Total cobrado</span>
            <span className="text-xl font-bold text-primary">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-border p-6">
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Printer className="size-4" /> Imprimir
          </button>
          <Link
            href="/nuevo-pedido"
            onClick={clear}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <PlusCircle className="size-4" /> Nuevo pedido
          </Link>
        </div>
      </div>

      <Link
        href="/dashboard"
        onClick={clear}
        className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <Home className="size-4" /> Volver al panel
      </Link>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
