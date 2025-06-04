export interface ProductOption {
  id: string;
  productId: string;
  name: string;
  extraCost: number;
  quantity: number;
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  isAvailable: boolean
  createdAt: Date
  options?: ProductOption[]
}

export interface Category {
  id: string
  name: string
  image: string | null
}

export interface Promotion {
  id: string
  name: string
  description: string
  discountPercentage: number
  originalPrice: number
  promoPrice: number
  image: string
  isActive: boolean
  startDate: Date
  endDate: Date
  categoryId: string
  createdAt: Date
}

export type CartItemPayload = {
  itemId: string
  categoryId: string
  quantity: number
  unitPrice: number
}

export type User = {
  id: string
  name: string
  phoneNumber: string
  role: string
  password: string
  createdAt: Date
}