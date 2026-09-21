'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Users, Receipt, Plus, Utensils } from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import {
  tables as initialTables,
  type Table,
  type TableStatus,
} from '@/lib/data'
import { cn } from '@/lib/utils'

const filters: { id: 'todas' | TableStatus; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'libre', label: 'Libres' },
  { id: 'ocupada', label: 'Ocupadas' },
  { id: 'reservada', label: 'Reservadas' },
]

const borderTone: Record<TableStatus, string> = {
  libre: 'border-secondary/30 hover:border-secondary',
  ocupada: 'border-primary/30 hover:border-primary',
  reservada: 'border-warning/40 hover:border-warning',
}

const iconTone: Record<TableStatus, string> = {
  libre: 'bg-secondary/12 text-secondary',
  ocupada: 'bg-primary/12 text-primary',
  reservada: 'bg-warning/20 text-warning-foreground',
}

export function MesasGrid() {
  const [tables, setTables] = useState<Table[]>(initialTables)
  const [filter, setFilter] = useState<'todas' | TableStatus>('todas')

  const visible = useMemo(
    () => (filter === 'todas' ? tables : tables.filter((t) => t.status === filter)),
    [tables, filter],
  )

  const cycle = (id: number) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const next: Record<TableStatus, TableStatus> = {
          libre: 'reservada',
          reservada: 'ocupada',
          ocupada: 'libre',
        }
        const status = next[t.status]
        return {
          ...t,
          status,
          order: status === 'ocupada' ? `#${1046 + id}` : undefined,
        }
      }),
    )
  }

  const counts = {
    libre: tables.filter((t) => t.status === 'libre').length,
    ocupada: tables.filter((t) => t.status === 'ocupada').length,
    reservada: tables.filter((t) => t.status === 'reservada').length,
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                filter === f.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-secondary" />
            {counts.libre} libres
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-primary" />
            {counts.ocupada} ocupadas
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-warning" />
            {counts.reservada} reservadas
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((table) => (
          <div
            key={table.id}
            className={cn(
              'flex flex-col rounded-2xl border-2 bg-card p-5 shadow-sm transition-all',
              borderTone[table.status],
            )}
          >
            <div className="flex items-start justify-between">
              <span
                className={cn(
                  'grid size-11 place-items-center rounded-xl',
                  iconTone[table.status],
                )}
              >
                <Utensils className="size-5" />
              </span>
              <StatusBadge status={table.status} />
            </div>
            <p className="mt-4 text-lg font-bold">Mesa {table.id}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="size-4" /> {table.seats} personas
            </p>
            {table.order ? (
              <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary">
                <Receipt className="size-4" /> Pedido {table.order}
              </p>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">Sin pedido</p>
            )}

            <div className="mt-4 flex gap-2">
              {table.status === 'ocupada' ? (
                <Link
                  href="/pedido"
                  className="flex-1 rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Ver pedido
                </Link>
              ) : (
                <Link
                  href="/nuevo-pedido"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
                >
                  <Plus className="size-4" /> Pedido
                </Link>
              )}
              <button
                type="button"
                onClick={() => cycle(table.id)}
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`Cambiar estado de mesa ${table.id}`}
              >
                Estado
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
