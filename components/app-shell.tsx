'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Grid3x3,
  PlusCircle,
  ChefHat,
  Bike,
  Boxes,
  BarChart3,
  LogOut,
  Bell,
  Search,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/mesas', label: 'Mesas', icon: Grid3x3 },
  { href: '/nuevo-pedido', label: 'Nuevo Pedido', icon: PlusCircle },
  { href: '/pedido', label: 'Cocina', icon: ChefHat },
  { href: '/cobro', label: 'Cobro', icon: Bike },
  { href: '/stock', label: 'Stock', icon: Boxes },
  { href: '/reportes', label: 'Reportes', icon: BarChart3 },
]

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle?: string
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Logo variant="light" />
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
            Operaciones
          </p>
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                )}
              >
                <Icon className="size-[18px]" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="grid size-9 place-items-center rounded-full bg-sidebar-accent text-sm font-semibold">
              MR
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold">María Rossi</p>
              <p className="truncate text-xs text-sidebar-foreground/50">
                Administradora
              </p>
            </div>
            <Link
              href="/"
              aria-label="Cerrar sesión"
              className="rounded-md p-1.5 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <LogOut className="size-4" />
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-card/80 px-5 backdrop-blur-sm md:px-8">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold tracking-tight md:text-xl">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-xs text-muted-foreground md:text-sm">
                {subtitle}
              </p>
            )}
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground lg:flex">
            <Search className="size-4" />
            <span>Buscar…</span>
          </div>
          <button
            type="button"
            aria-label="Notificaciones"
            className="relative grid size-10 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
          >
            <Bell className="size-[18px]" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary ring-2 ring-card" />
          </button>
        </header>

        <main className="flex-1 p-5 md:p-8">{children}</main>

        <nav className="sticky bottom-0 z-10 flex items-center justify-around border-t border-border bg-card px-2 py-2 md:hidden">
          {nav.slice(0, 5).map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
