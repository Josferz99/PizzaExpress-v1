import { AppShell } from '@/components/app-shell'
import { MesasGrid } from '@/components/mesas-grid'

export default function MesasPage() {
  return (
    <AppShell
      title="Gestión de Mesas"
      subtitle="Estado del salón en tiempo real"
    >
      <MesasGrid />
    </AppShell>
  )
}
