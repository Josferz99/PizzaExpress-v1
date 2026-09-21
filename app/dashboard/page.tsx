import Link from 'next/link'
import {
  DollarSign,
  ClipboardList,
  Armchair,
  Bike,
  Grid3x3,
  PlusCircle,
  ChefHat,
  Boxes,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { StatCard } from '@/components/stat-card'
import { StatusBadge } from '@/components/status-badge'
import { formatCurrency, tables } from '@/lib/data'

const quickAccess = [
  { href: '/mesas', label: 'Mesas', icon: Grid3x3, tone: 'bg-secondary' },
  {
    href: '/nuevo-pedido',
    label: 'Nuevo Pedido',
    icon: PlusCircle,
    tone: 'bg-primary',
  },
  { href: '/pedido', label: 'Cocina', icon: ChefHat, tone: 'bg-amber-500' },
  { href: '/cobro', label: 'Delivery', icon: Bike, tone: 'bg-secondary' },
  { href: '/stock', label: 'Stock', icon: Boxes, tone: 'bg-slate-600' },
  {
    href: '/reportes',
    label: 'Reportes',
    icon: BarChart3,
    tone: 'bg-primary',
  },
]

const activeOrders = [
  { id: '#1042', table: 'Mesa 1', items: 3, total: 34.9, status: 'cocina' },
  { id: '#1043', table: 'Mesa 4', items: 5, total: 58.3, status: 'listo' },
  { id: '#1044', table: 'Mesa 7', items: 2, total: 27.4, status: 'pendiente' },
  { id: '#1045', table: 'Delivery', items: 4, total: 46.0, status: 'cocina' },
]

export default function DashboardPage() {
  const ocupadas = tables.filter((t) => t.status === 'ocupada').length
  const libres = tables.filter((t) => t.status === 'libre').length

  return (
    <AppShell
      title="Panel Principal"
      subtitle="Resumen operativo · Domingo 21 de septiembre"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Ventas del día"
          value={formatCurrency(2410)}
          icon={DollarSign}
          tone="primary"
          trend={{ value: '+12%', up: true }}
        />
        <StatCard
          label="Pedidos activos"
          value="4"
          icon={ClipboardList}
          tone="secondary"
          trend={{ value: '+2', up: true }}
        />
        <StatCard
          label="Mesas ocupadas"
          value={`${ocupadas} / ${tables.length}`}
          icon={Armchair}
          tone="warning"
        />
        <StatCard
          label="Deliveries en curso"
          value="3"
          icon={Bike}
          tone="neutral"
          trend={{ value: '-1', up: false }}
        />
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Accesos rápidos
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickAccess.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span
                  className={`grid size-12 place-items-center rounded-xl ${item.tone} text-white shadow-sm`}
                >
                  <Icon className="size-6" />
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-semibold">Pedidos activos</h2>
            <Link
              href="/pedido"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver cocina <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-4 md:px-5"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-muted text-sm font-bold">
                  {order.id.replace('#', '')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{order.table}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items} productos · {formatCurrency(order.total)}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Ocupación de mesas</h2>
            <Link
              href="/mesas"
              className="text-sm font-medium text-primary hover:underline"
            >
              Gestionar
            </Link>
          </div>
          <div className="mt-5 flex items-end gap-3">
            <div className="flex-1 rounded-xl bg-primary/10 p-4 text-center">
              <p className="text-3xl font-bold text-primary">{ocupadas}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                Ocupadas
              </p>
            </div>
            <div className="flex-1 rounded-xl bg-secondary/12 p-4 text-center">
              <p className="text-3xl font-bold text-secondary">{libres}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                Libres
              </p>
            </div>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${(ocupadas / tables.length) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {Math.round((ocupadas / tables.length) * 100)}% del salón en uso
          </p>
        </section>
      </div>
    </AppShell>
  )
}
