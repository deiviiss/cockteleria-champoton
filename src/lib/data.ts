import { getProducts } from "@/actions/get-products"
import { Category, Product, Promotion } from "@/lib/types"
import { getCategories } from "@/actions/get-categories"
import { getPromotions } from "@/actions/get-promotions"

// save data
export async function saveProduct(product: Product): Promise<void> {
  try {
    const products = await getProducts()
    const index = products.findIndex((p) => p.id === product.id)

    if (index >= 0) {
      products[index] = product
    } else {
      products.push(product)
    }
  } catch (error) {
    console.error("Error al guardar producto:", error)
    throw error
  }
}

export async function saveCategory(category: Category): Promise<void> {
  try {
    const categories = await getCategories()
    const index = categories.findIndex((c) => c.id === category.id)

    if (index >= 0) {
      categories[index] = category
    } else {
      categories.push(category)
    }
  } catch (error) {
    console.error("Error al guardar categoría:", error)
    throw error
  }
}

export async function savePromotion(promotion: Promotion): Promise<void> {
  try {
    const promotions = await getPromotions()
    const index = promotions.findIndex((p) => p.id === promotion.id)

    if (index >= 0) {
      promotions[index] = promotion
    } else {
      promotions.push(promotion)
    }
  } catch (error) {
    console.error("Error al guardar promoción:", error)
    throw error
  }
}

// delete data
export async function deleteProduct(id: string): Promise<void> {
  try {
    const products = await getProducts()
    const updatedProducts = products.filter((p) => p.id !== id)

  } catch (error) {
    console.error("Error al eliminar producto:", error)
    throw error
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    const categories = await getCategories()
    const updatedCategories = categories.filter((c) => c.id !== id)

  } catch (error) {
    console.error("Error al eliminar categoría:", error)
    throw error
  }
}

export async function deletePromotion(id: string): Promise<void> {
  try {
    const promotions = await getPromotions()
    const deletedPromotion = promotions.find((p) => p.id === id)
    const updatedPromotions = promotions.filter((p) => p.id !== id)

    // Eliminar los precios de promoción de los productos afectados
    if (deletedPromotion) {
      const products = await getProducts()
      let updated = false

      for (const product of products) {
        if (deletedPromotion.productIds.includes(product.id) && product.promotionPrice !== null) {
          product.promotionPrice = null
          updated = true
        }
      }

      if (updated) {

      }
    }
  } catch (error) {
    console.error("Error al eliminar promoción:", error)
    throw error
  }
}

// Función para aplicar promoción a productos
export async function applyPromotion(promotion: Promotion): Promise<void> {
  try {
    const products = await getProducts()
    let updated = false

    // Verificar si la promoción está activa y dentro del rango de fechas
    const now = new Date()
    const startDate = new Date(promotion.startDate)
    const endDate = new Date(promotion.endDate)
    const isActive = promotion.active && startDate <= now && endDate >= now

    for (const product of products) {
      if (promotion.productIds.includes(product.id)) {
        if (isActive) {
          // Aplicar descuento
          const discountedPrice = product.price * (1 - promotion.discountPercentage / 100)
          product.promotionPrice = Number.parseFloat(discountedPrice.toFixed(2))
        } else {
          // Quitar descuento si la promoción no está activa
          product.promotionPrice = null
        }
        updated = true
      }
    }

    if (updated) {

    }
  } catch (error) {
    console.error("Error al aplicar promoción:", error)
    throw error
  }
}
