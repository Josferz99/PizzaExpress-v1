'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Search } from 'lucide-react'
import { OrderCart } from '@/components/order-cart'
import { useOrder } from '@/lib/order-store'
import {
  categories,
  formatCurrency,
  products,
  type Category,
} from '@/lib/data'
import { cn } from '@/lib/utils'

export function NuevoPedido() {
  const { addItem, items } = useOrder()
  const [category, setCategory] = useState<Category>('pizzas')
  const [query, setQuery] = useState('')

  const filtered = products.filter(
    (p) =>
      p.category === category &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  )

  const qtyOf = (id: string) =>
    items.find((i) => i.product.id === id)?.quantity ?? 0

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                  category === c.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground',
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="relative sm:w-56">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar producto…"
              className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filtered.map((product) => {
            const qty = qtyOf(product.id)
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => addItem(product)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {qty > 0 && (
                    <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md">
                      {qty}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="mt-0.5 line-clamp-2 flex-1 text-xs text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-primary">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Plus className="size-4" />
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
        <OrderCart />
      </div>
    </div>
  )
}
