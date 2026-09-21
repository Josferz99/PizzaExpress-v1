import { AppShell } from '@/components/app-shell'
import { NuevoPedido } from '@/components/nuevo-pedido'

export default function NuevoPedidoPage() {
  return (
    <AppShell
      title="Nuevo Pedido"
      subtitle="Selecciona productos y arma la comanda"
    >
      <NuevoPedido />
    </AppShell>
  )
}
