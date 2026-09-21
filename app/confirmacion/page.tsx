import { AppShell } from '@/components/app-shell'
import { Confirmacion } from '@/components/confirmacion'

export default function ConfirmacionPage() {
  return (
    <AppShell title="Pago confirmado" subtitle="La transacción se completó">
      <Confirmacion />
    </AppShell>
  )
}
