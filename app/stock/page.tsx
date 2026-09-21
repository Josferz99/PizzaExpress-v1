import { AppShell } from '@/components/app-shell'
import { StockTable } from '@/components/stock-table'

export default function StockPage() {
  return (
    <AppShell
      title="Control de Stock"
      subtitle="Inventario de ingredientes y productos"
    >
      <StockTable />
    </AppShell>
  )
}
