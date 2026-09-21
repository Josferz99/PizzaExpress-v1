'use client'

import { useState } from 'react'
import { Minus, Plus, AlertTriangle, PackageX, Package, Search } from 'lucide-react'
import { StatCard } from '@/components/stat-card'
import { stockItems as initial, stockLevel, type StockItem } from '@/lib/data'
import { cn } from '@/lib/utils'

const levelMeta = {
  critico: { label: 'Crítico', badge: 'bg-primary/12 text-primary', bar: 'bg-primary' },
  bajo: { label: 'Bajo', badge: 'bg-warning/20 text-warning-foreground', bar: 'bg-warning' },
  ok: { label: 'OK', badge: 'bg-secondary/15 text-secondary', bar: 'bg-secondary' },
}

export function StockTable() {
  const [items, setItems] = useState<StockItem[]>(initial)
  const [query, setQuery] = useState('')

  const adjust = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, current: Math.max(0, i.current + delta) } : i,
      ),
    )
  }

  const visible = items.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase()),
  )

  const critico = items.filter((i) => stockLevel(i) === 'critico').length
  const bajo = items.filter((i) => stockLevel(i) === 'bajo').length

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Ingredientes totales"
          value={String(items.length)}
          icon={Package}
          tone="neutral"
        />
        <StatCard
          label="Stock bajo"
          value={String(bajo)}
          icon={AlertTriangle}
          tone="warning"
        />
        <StatCard
          label="Stock crítico"
          value={String(critico)}
          icon={PackageX}
          tone="primary"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border p-4 md:px-5">
          <h2 className="font-semibold">Inventario</h2>
          <div className="relative w-48 sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar ingrediente…"
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="hidden grid-cols-[2fr_1fr_1fr_auto] gap-4 border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:grid">
          <span>Ingrediente</span>
          <span>Nivel</span>
          <span>Estado</span>
          <span className="text-right">Ajustar</span>
        </div>

        <ul className="divide-y divide-border">
          {visible.map((item) => {
            const level = stockLevel(item)
            const meta = levelMeta[level]
            const pct = Math.min(100, (item.current / (item.min * 2)) * 100)
            return (
              <li
                key={item.id}
                className="grid grid-cols-2 items-center gap-4 p-4 md:grid-cols-[2fr_1fr_1fr_auto] md:px-5"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.current} {item.unit} · mín {item.min}
                  </p>
                </div>

                <div className="hidden md:block">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn('h-full rounded-full', meta.bar)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="hidden md:block">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
                      meta.badge,
                    )}
                  >
                    {meta.label}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => adjust(item.id, -1)}
                    className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Restar ${item.name}`}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">
                    {item.current}
                  </span>
                  <button
                    type="button"
                    onClick={() => adjust(item.id, 1)}
                    className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Sumar ${item.name}`}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
