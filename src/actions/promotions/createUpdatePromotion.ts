'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const promotionSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3).max(100),
  description: z.string().min(3).max(200),
  discountPercentage: z.coerce.number().min(0).max(100),
  originalPrice: z.coerce.number().positive(),
  promoPrice: z.coerce.number().positive(),
  image: z.string().url(),
  isActive: z.coerce.boolean().optional().default(true),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  categoryId: z.string().uuid()
})

export const createUpdatePromotion = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const parsed = promotionSchema.safeParse(data)

  if (!parsed.success) {
    return { ok: false, message: 'Datos inválidos' }
  }

  const {
    id,
    name,
    description,
    discountPercentage,
    originalPrice,
    promoPrice,
    image,
    isActive,
    startDate,
    endDate,
    categoryId
  } = parsed.data

  try {
    const promotion = id
      ? await prisma.promotion.update({
        where: { id },
        data: {
          name,
          description,
          discountPercentage,
          originalPrice,
          promoPrice,
          image,
          isActive,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          categoryId
        }
      })
      : await prisma.promotion.create({
        data: {
          name,
          description,
          discountPercentage,
          originalPrice,
          promoPrice,
          image,
          isActive,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          categoryId
        }
      })

    revalidatePath('/admin/promotions')

    return { ok: true, message: id ? 'Promoción actualizada' : 'Promoción creada', promotion }
  } catch (error) {
    return { ok: false, message: 'Error al guardar la promoción' }
  }
}
