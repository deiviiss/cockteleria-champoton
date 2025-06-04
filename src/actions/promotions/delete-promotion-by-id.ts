'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export const deletePromotion = async (id: string) => {
  if (!id) return { ok: false, message: 'ID requerido' }

  try {
    const productsCount = await prisma.product.count({
      where: { categoryId: id }
    })

    const promotionsCount = await prisma.promotion.count({
      where: { categoryId: id }
    })

    if (productsCount > 0 || promotionsCount > 0) {
      return {
        ok: false,
        message: 'No se puede eliminar. La categoría tiene productos o promociones asociadas.'
      }
    }

    await prisma.promotion.delete({ where: { id } })

    revalidatePath('/admin/promotions')

    return { ok: true, message: 'Promoción eliminada' }
  } catch (error) {
    return { ok: false, message: 'Error al eliminar la promoción' }
  }
}
