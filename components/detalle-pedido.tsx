'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Clock,
  ChefHat,
  CheckCircle2,
  PackageCheck,
  MapPin,
  Store,
  ArrowRight,
  Printer,
} from 'lucide-react'
import { useOrder, type OrderStatus } from '@/lib/order-store'
import { formatCurrency } from '@/lib/data'
import { cn } from '@/lib/utils'

const steps: { id: OrderStatus; label: string; icon: typeof Clock }[] = [
  { id: 'pendiente', label: 'Recibido', icon: Clock },
  { id: 'cocina', label: 'En cocina', icon: ChefHat },
  { id: 'listo', label: 'Listo', icon: CheckCircle2 },
  { id: 'entregado', label: 'Entregado', icon: PackageCheck },
]

export function DetallePedido() {
  const {
    items,
    target,
    status,
    setStatus,
    orderNumber,
    subtotal,
    tax,
    total,
  } = useOrder()

  if (items.length === 0) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
        <div className="grid size-14 place-items-center rounded-full bg-muted">
          <ChefHat className="size-6 text-muted-foreground" />
        </div>
        <p className="mt-4 font-medium">No hay un pedido activo</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Crea una comanda para verla en cocina.
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

  const currentIndex = steps.findIndex((s) => s.id === status)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-lg font-bold">Comanda {orderNumber}</p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                {target.type === 'mesa' ? (
                  <>
                    <Store className="size-4" /> Mesa {target.table}
                  </>
                ) : (
                  <>
                    <MapPin className="size-4" /> Delivery
                  </>
                )}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Printer className="size-4" /> Ticket
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              {steps.map((step, i) => {
                const Icon = step.icon
                const done = i <= currentIndex
                return (
                  <div key={step.id} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={cn(
                          'grid size-11 place-items-center rounded-full border-2 transition-colors',
                          done
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-card text-muted-foreground',
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span
                        className={cn(
                          'text-xs font-medium',
                          done ? 'text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={cn(
                          'mx-2 h-0.5 flex-1 rounded-full',
                          i < currentIndex ? 'bg-primary' : 'bg-border',
                        )}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border p-5">
            <h2 className="font-semibold">Productos</h2>
          </div>
          <ul className="divide-y divide-border">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-4 p-4 md:px-5">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(product.price)} c/u
                  </p>
                </div>
                <span className="rounded-lg bg-muted px-2.5 py-1 text-sm font-semibold">
                  ×{quantity}
                </span>
                <span className="w-20 text-right font-semibold">
                  {formatCurrency(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Resumen</h2>
          <div className="mt-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>IVA (10%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Actualizar estado</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setStatus(step.id)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                  status === step.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        <Link
          href="/cobro"
          className="flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          Proceder al cobro <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
