import { AppShell } from '@/components/app-shell'
import { Reportes } from '@/components/reportes'

export default function ReportesPage() {
  return (
    <AppShell
      title="Reportes"
      subtitle="Análisis de ventas y rendimiento"
    >
      <Reportes />
    </AppShell>
  )
}
