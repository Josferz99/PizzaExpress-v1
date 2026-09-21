export type Category = 'pizzas' | 'bebidas' | 'postres'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: Category
  image: string
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Pizza Margarita',
    description: 'Salsa de tomate, mozzarella y albahaca fresca',
    price: 12.5,
    category: 'pizzas',
    image: '/products/pizza-margarita.png',
  },
  {
    id: 'p2',
    name: 'Pizza Pepperoni',
    description: 'Mozzarella y generosas láminas de pepperoni',
    price: 14.9,
    category: 'pizzas',
    image: '/products/pizza-pepperoni.png',
  },
  {
    id: 'p3',
    name: 'Pizza Cuatro Quesos',
    description: 'Mozzarella, gorgonzola, parmesano y provolone',
    price: 15.5,
    category: 'pizzas',
    image: '/products/pizza-cuatro-quesos.png',
  },
  {
    id: 'p4',
    name: 'Pizza Vegetariana',
    description: 'Pimientos, champiñones, cebolla y aceitunas',
    price: 13.9,
    category: 'pizzas',
    image: '/products/pizza-vegetariana.png',
  },
  {
    id: 'b1',
    name: 'Coca-Cola',
    description: 'Refresco de cola 500 ml',
    price: 2.5,
    category: 'bebidas',
    image: '/products/bebida-cola.png',
  },
  {
    id: 'b2',
    name: 'Agua Mineral',
    description: 'Agua mineral natural 500 ml',
    price: 1.8,
    category: 'bebidas',
    image: '/products/bebida-agua.png',
  },
  {
    id: 'd1',
    name: 'Tiramisú',
    description: 'Clásico postre italiano con café y cacao',
    price: 5.5,
    category: 'postres',
    image: '/products/postre-tiramisu.png',
  },
  {
    id: 'd2',
    name: 'Brownie con Helado',
    description: 'Brownie de chocolate con helado de vainilla',
    price: 6.0,
    category: 'postres',
    image: '/products/postre-brownie.png',
  },
]

export const categories: { id: Category; label: string }[] = [
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'postres', label: 'Postres' },
]

export type TableStatus = 'libre' | 'ocupada' | 'reservada'

export type Table = {
  id: number
  seats: number
  status: TableStatus
  order?: string
}

export const tables: Table[] = [
  { id: 1, seats: 2, status: 'ocupada', order: '#1042' },
  { id: 2, seats: 4, status: 'libre' },
  { id: 3, seats: 4, status: 'reservada' },
  { id: 4, seats: 2, status: 'ocupada', order: '#1043' },
  { id: 5, seats: 6, status: 'libre' },
  { id: 6, seats: 4, status: 'libre' },
  { id: 7, seats: 2, status: 'ocupada', order: '#1044' },
  { id: 8, seats: 4, status: 'reservada' },
  { id: 9, seats: 8, status: 'libre' },
  { id: 10, seats: 2, status: 'ocupada', order: '#1045' },
  { id: 11, seats: 4, status: 'libre' },
  { id: 12, seats: 6, status: 'libre' },
]

export type StockItem = {
  id: string
  name: string
  unit: string
  current: number
  min: number
}

export const stockItems: StockItem[] = [
  { id: 's1', name: 'Harina 00', unit: 'kg', current: 42, min: 20 },
  { id: 's2', name: 'Mozzarella', unit: 'kg', current: 8, min: 12 },
  { id: 's3', name: 'Salsa de Tomate', unit: 'l', current: 25, min: 10 },
  { id: 's4', name: 'Pepperoni', unit: 'kg', current: 3, min: 6 },
  { id: 's5', name: 'Albahaca fresca', unit: 'manojos', current: 14, min: 8 },
  { id: 's6', name: 'Champiñones', unit: 'kg', current: 5, min: 5 },
  { id: 's7', name: 'Aceite de oliva', unit: 'l', current: 18, min: 8 },
  { id: 's8', name: 'Coca-Cola', unit: 'unid', current: 96, min: 48 },
  { id: 's9', name: 'Agua Mineral', unit: 'unid', current: 30, min: 48 },
  { id: 's10', name: 'Café espresso', unit: 'kg', current: 4, min: 3 },
]

export function stockLevel(item: StockItem): 'critico' | 'bajo' | 'ok' {
  if (item.current <= item.min) return 'critico'
  if (item.current <= item.min * 1.5) return 'bajo'
  return 'ok'
}

export const salesByDay = [
  { day: 'Lun', ventas: 1240 },
  { day: 'Mar', ventas: 980 },
  { day: 'Mié', ventas: 1520 },
  { day: 'Jue', ventas: 1360 },
  { day: 'Vie', ventas: 2180 },
  { day: 'Sáb', ventas: 2740 },
  { day: 'Dom', ventas: 2410 },
]

export const topProducts = [
  { name: 'Pepperoni', vendidos: 148 },
  { name: 'Margarita', vendidos: 121 },
  { name: 'Cuatro Quesos', vendidos: 96 },
  { name: 'Vegetariana', vendidos: 74 },
  { name: 'Coca-Cola', vendidos: 210 },
]

export const tablePerformance = [
  { mesa: 'Mesa 1', ingresos: 420 },
  { mesa: 'Mesa 4', ingresos: 380 },
  { mesa: 'Mesa 7', ingresos: 510 },
  { mesa: 'Mesa 10', ingresos: 295 },
  { mesa: 'Mesa 12', ingresos: 460 },
]

export const TAX_RATE = 0.1

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}
