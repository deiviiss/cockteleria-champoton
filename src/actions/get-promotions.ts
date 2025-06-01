'use server'

import { Promotion } from "@/lib/types"

const initialPromotions: Promotion[] = [
  {
    id: "1",
    name: "Combo Playero",
    description: "Torres de mariscos + Coctel de camarón jumbo a precio especial.",
    discountPercentage: 15,
    originalPrice: 530, // 350 + 180
    promoPrice: 450,
    image: "",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 días
    categoryId: "1", // Especialidades
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Chilaquiles con Papas",
    description: "Chilaquiles a la francisca con papas a la francesa incluidas.",
    discountPercentage: 20,
    originalPrice: 230, // 170 + 60
    promoPrice: 185,
    image: "",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    categoryId: "1",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Ensalada Doble Pulpo",
    description: "Compra una ensalada de pulpo y llévate la segunda al 50%.",
    discountPercentage: 25,
    originalPrice: 460, // 230 x 2
    promoPrice: 345,
    image: '',
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    categoryId: "5", // Ensaladas
    createdAt: new Date(),
  },
];

export async function getPromotions(): Promise<Promotion[]> {
  try {
    return initialPromotions
  } catch (error) {
    console.error("Error al obtener promociones:", error)
    return initialPromotions
  }
}