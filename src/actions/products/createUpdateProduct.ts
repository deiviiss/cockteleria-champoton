'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3).max(100),
  description: z.string().min(3).max(200),
  price: z.coerce.number().positive('El precio debe ser mayor a 0'),
  image: z.string().url(),
  categoryId: z.string().uuid(),
  isAvailable: z.coerce.boolean().optional().default(true)
})

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const parsed = productSchema.safeParse(data)

  if (!parsed.success) {
    return { ok: false, message: 'Datos inválidos' }
  }

  const { id, name, description, price, image, categoryId, isAvailable } = parsed.data

  try {
    const product = id
      ? await prisma.product.update({
        where: { id },
        data: { name, description, price, image, categoryId, isAvailable }
      })
      : await prisma.product.create({
        data: {
          name,
          description,
          price,
          image,
          categoryId,
          isAvailable
        }
      })

    revalidatePath('/admin/products')

    return { ok: true, message: id ? 'Producto actualizado' : 'Producto creado', product }
  } catch (error) {
    return { ok: false, message: 'Error al guardar el producto' }
  }
}
