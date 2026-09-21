import { AppShell } from '@/components/app-shell'
import { DetallePedido } from '@/components/detalle-pedido'

export default function PedidoPage() {
  return (
    <AppShell
      title="Detalle del Pedido"
      subtitle="Seguimiento de cocina y preparación"
    >
      <DetallePedido />
    </AppShell>
  )
}
