import { LoginForm } from '@/components/login-form'
import { Logo } from '@/components/logo'
import { CheckCircle2 } from 'lucide-react'

const highlights = [
  'Pedidos, mesas y cocina en tiempo real',
  'Control de stock con alertas de reposición',
  'Cobros y reportes ejecutivos al instante',
]

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-sidebar p-12 text-white lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 size-96 rounded-full bg-secondary/20 blur-3xl"
        />
        <Logo variant="light" size="lg" />
        <div className="relative z-10 max-w-md">
          <h2 className="text-balance text-4xl font-bold leading-tight">
            La gestión de tu pizzería, en una sola plataforma.
          </h2>
          <ul className="mt-8 space-y-4">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-white/80">
                <CheckCircle2 className="size-5 shrink-0 text-secondary" />
                <span className="text-sm">{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-xs text-white/40">
          © 2026 PizzaExpress Gestión — Sistema POS/ERP
        </p>
      </section>

      <section className="flex w-full flex-col items-center justify-center bg-background p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo size="lg" />
          </div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Bienvenido</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingresa tus credenciales para acceder al panel de gestión.
            </p>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  )
}
