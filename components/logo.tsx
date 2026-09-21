import { Pizza } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  variant = 'dark',
  size = 'md',
}: {
  className?: string
  variant?: 'dark' | 'light'
  size?: 'md' | 'lg'
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'grid place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm',
          size === 'lg' ? 'size-12' : 'size-9',
        )}
      >
        <Pizza className={size === 'lg' ? 'size-7' : 'size-5'} />
      </span>
      <div className="leading-tight">
        <p
          className={cn(
            'font-bold tracking-tight',
            size === 'lg' ? 'text-2xl' : 'text-base',
            variant === 'light' ? 'text-white' : 'text-foreground',
          )}
        >
          Pizza<span className="text-primary">Express</span>
        </p>
        <p
          className={cn(
            'font-medium uppercase tracking-widest',
            size === 'lg' ? 'text-xs' : 'text-[10px]',
            variant === 'light' ? 'text-white/60' : 'text-muted-foreground',
          )}
        >
          Gestión
        </p>
      </div>
    </div>
  )
}
