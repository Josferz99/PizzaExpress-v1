'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { DollarSign, TrendingUp, Receipt, Users } from 'lucide-react'
import { StatCard } from '@/components/stat-card'
import {
  formatCurrency,
  salesByDay,
  tablePerformance,
  topProducts,
} from '@/lib/data'

const weekTotal = salesByDay.reduce((s, d) => s + d.ventas, 0)
const avgTicket = 28.4
const barColors = ['#d64545', '#e07a5f', '#3d8168', '#c9a227', '#5b7bb4']

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="font-semibold">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  )
}

export function Reportes() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Ventas de la semana"
          value={formatCurrency(weekTotal)}
          icon={DollarSign}
          tone="primary"
          trend={{ value: '+18%', up: true }}
        />
        <StatCard
          label="Ticket promedio"
          value={formatCurrency(avgTicket)}
          icon={Receipt}
          tone="secondary"
          trend={{ value: '+4%', up: true }}
        />
        <StatCard
          label="Pedidos totales"
          value="428"
          icon={TrendingUp}
          tone="warning"
          trend={{ value: '+32', up: true }}
        />
        <StatCard
          label="Clientes atendidos"
          value="1.204"
          icon={Users}
          tone="neutral"
        />
      </div>

      <ChartCard title="Ventas por día" subtitle="Últimos 7 días">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={salesByDay} margin={{ left: -12, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="ventas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d64545" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#d64545" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: 'var(--border)' }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--card)',
                fontSize: 13,
              }}
              formatter={(v: number) => [formatCurrency(v), 'Ventas']}
            />
            <Area
              type="monotone"
              dataKey="ventas"
              stroke="#d64545"
              strokeWidth={2.5}
              fill="url(#ventas)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Productos más vendidos" subtitle="Unidades esta semana">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topProducts} margin={{ left: -12, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: 'var(--muted)' }}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--card)',
                  fontSize: 13,
                }}
                formatter={(v: number) => [`${v} uds`, 'Vendidos']}
              />
              <Bar dataKey="vendidos" radius={[6, 6, 0, 0]}>
                {topProducts.map((_, i) => (
                  <Cell key={i} fill={barColors[i % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Ingresos por mesa" subtitle="Top 5 mesas">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={tablePerformance}
              layout="vertical"
              margin={{ left: 12, right: 8, top: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="mesa"
                tickLine={false}
                axisLine={false}
                width={64}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: 'var(--muted)' }}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--card)',
                  fontSize: 13,
                }}
                formatter={(v: number) => [formatCurrency(v), 'Ingresos']}
              />
              <Bar dataKey="ingresos" radius={[0, 6, 6, 0]} fill="#3d8168" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
