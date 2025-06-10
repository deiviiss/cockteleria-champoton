'use server'

import prisma from "@/lib/prisma"
import { Product } from "@/lib/types"

export async function getProducts(): Promise<Product[]> {
  try {
    const products: Product[] = await prisma.product.findMany({
      include: {
        options: true
      }
    })

    if (!products) return []

    return products
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return []
  }
}