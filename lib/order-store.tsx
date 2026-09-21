'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { TAX_RATE, type Product } from '@/lib/data'

export type OrderItem = {
  product: Product
  quantity: number
}

export type OrderStatus = 'pendiente' | 'cocina' | 'listo' | 'entregado'

export type OrderTarget =
  | { type: 'mesa'; table: number }
  | { type: 'delivery' }

type OrderContextValue = {
  items: OrderItem[]
  target: OrderTarget
  status: OrderStatus
  orderNumber: string
  paymentMethod: string | null
  setTarget: (target: OrderTarget) => void
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
  setStatus: (status: OrderStatus) => void
  setPaymentMethod: (method: string) => void
  subtotal: number
  tax: number
  total: number
  itemCount: number
}

const OrderContext = createContext<OrderContextValue | null>(null)

function randomOrderNumber() {
  return `#${Math.floor(1046 + Math.random() * 900)}`
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([])
  const [target, setTarget] = useState<OrderTarget>({ type: 'mesa', table: 2 })
  const [status, setStatus] = useState<OrderStatus>('pendiente')
  const [orderNumber] = useState(randomOrderNumber)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i,
      ),
    )
  }

  const clear = () => {
    setItems([])
    setStatus('pendiente')
    setPaymentMethod(null)
  }

  const { subtotal, tax, total, itemCount } = useMemo(() => {
    const subtotal = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0,
    )
    const tax = subtotal * TAX_RATE
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
    return { subtotal, tax, total: subtotal + tax, itemCount }
  }, [items])

  const value: OrderContextValue = {
    items,
    target,
    status,
    orderNumber,
    paymentMethod,
    setTarget,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    setStatus,
    setPaymentMethod,
    subtotal,
    tax,
    total,
    itemCount,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used within OrderProvider')
  return ctx
}
