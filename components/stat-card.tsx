import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  tone = 'primary',
}: {
  label: string
  value: string
  icon: LucideIcon
  trend?: { value: string; up: boolean }
  tone?: 'primary' | 'secondary' | 'warning' | 'neutral'
}) {
  const toneClasses: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/12 text-secondary',
    warning: 'bg-warning/20 text-warning-foreground',
    neutral: 'bg-muted text-muted-foreground',
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'grid size-11 place-items-center rounded-xl',
            toneClasses[tone],
          )}
        >
          <Icon className="size-5" />
        </span>
        {trend && (
          <span
            className={cn(
              'inline-flex items-center gap-1 text-xs font-semibold',
              trend.up ? 'text-secondary' : 'text-primary',
            )}
          >
            {trend.up ? (
              <TrendingUp className="size-3.5" />
            ) : (
              <TrendingDown className="size-3.5" />
            )}
            {trend.value}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
