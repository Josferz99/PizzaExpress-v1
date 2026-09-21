'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingCart, MapPin, Store } from 'lucide-react'
import { useOrder } from '@/lib/order-store'
import { formatCurrency, tables } from '@/lib/data'
import { cn } from '@/lib/utils'

const freeTables = tables.filter((t) => t.status !== 'ocupada')

export function OrderCart() {
  const {
    items,
    target,
    setTarget,
    updateQuantity,
    removeItem,
    subtotal,
    tax,
    total,
    itemCount,
    orderNumber,
  } = useOrder()

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold">
            <ShoppingCart className="size-5 text-primary" /> Comanda{' '}
            {orderNumber}
          </h2>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {itemCount} items
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setTarget({ type: 'mesa', table: target.type === 'mesa' ? target.table : freeTables[0]?.id ?? 2 })}
            className={cn(
              'flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
              target.type === 'mesa'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground',
            )}
          >
            <Store className="size-4" /> Mesa
          </button>
          <button
            type="button"
            onClick={() => setTarget({ type: 'delivery' })}
            className={cn(
              'flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
              target.type === 'delivery'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground',
            )}
          >
            <MapPin className="size-4" /> Delivery
          </button>
        </div>

        {target.type === 'mesa' && (
          <select
            value={target.table}
            onChange={(e) =>
              setTarget({ type: 'mesa', table: Number(e.target.value) })
            }
            className="mt-2 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {tables.map((t) => (
              <option key={t.id} value={t.id}>
                Mesa {t.id} · {t.seats} personas
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-muted">
              <ShoppingCart className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">La comanda está vacía</p>
            <p className="text-xs text-muted-foreground">
              Agrega productos desde el catálogo
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center gap-3 rounded-xl border border-border p-2.5"
              >
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Restar"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Sumar"
                  >
                    <Plus className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="ml-1 grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:text-primary"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-3 border-t border-border p-5">
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>IVA (10%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between pt-1 text-base font-bold">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(total)}</span>
          </div>
        </div>
        <Link
          href="/pedido"
          aria-disabled={items.length === 0}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold shadow-sm transition-colors',
            items.length === 0
              ? 'pointer-events-none bg-muted text-muted-foreground'
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
          )}
        >
          Enviar a cocina
        </Link>
      </div>
    </div>
  )
}
