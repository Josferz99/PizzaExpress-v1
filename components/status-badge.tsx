import { cn } from '@/lib/utils'

const styles: Record<string, string> = {
  libre: 'bg-secondary/12 text-secondary border-secondary/25',
  ocupada: 'bg-primary/12 text-primary border-primary/25',
  reservada: 'bg-warning/20 text-warning-foreground border-warning/40',
  pendiente: 'bg-muted text-muted-foreground border-border',
  cocina: 'bg-warning/20 text-warning-foreground border-warning/40',
  listo: 'bg-secondary/12 text-secondary border-secondary/25',
  entregado: 'bg-primary/12 text-primary border-primary/25',
  ok: 'bg-secondary/12 text-secondary border-secondary/25',
  bajo: 'bg-warning/20 text-warning-foreground border-warning/40',
  critico: 'bg-primary/12 text-primary border-primary/25',
}

const labels: Record<string, string> = {
  libre: 'Libre',
  ocupada: 'Ocupada',
  reservada: 'Reservada',
  pendiente: 'Pendiente',
  cocina: 'En Cocina',
  listo: 'Listo',
  entregado: 'Entregado',
  ok: 'Óptimo',
  bajo: 'Bajo',
  critico: 'Reponer',
}

export function StatusBadge({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        styles[status] ?? styles.pendiente,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {labels[status] ?? status}
    </span>
  )
}
