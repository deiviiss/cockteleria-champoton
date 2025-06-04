'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export const deleteProduct = async (id: string) => {
  if (!id) return { ok: false, message: 'ID requerido' }

  try {
    await prisma.product.delete({ where: { id } })

    revalidatePath('/admin/products')

    return { ok: true, message: 'Producto eliminado' }
  } catch (error) {
    return { ok: false, message: 'Error al eliminar el producto' }
  }
}
