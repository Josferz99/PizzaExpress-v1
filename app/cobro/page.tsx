import { AppShell } from '@/components/app-shell'
import { Cobro } from '@/components/cobro'

export default function CobroPage() {
  return (
    <AppShell title="Cobro" subtitle="Selecciona el método de pago y finaliza">
      <Cobro />
    </AppShell>
  )
}
