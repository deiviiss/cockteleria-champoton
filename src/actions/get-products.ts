'use server'

import { Product } from "@/lib/types"

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Torres de Mariscos",
    description: "Torre alta con mariscos frescos, ideal para compartir",
    price: 350,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Torres_de_Mariscos_grande_350._Cat._Especialidades_jco7tu.jpg",
    categoryId: "1",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Molcajete de Mariscos",
    description: "Mariscos variados servidos al estilo tradicional en molcajete caliente",
    price: 400,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775105/Molcajete_de_Mariscos_400._Cat._Especialidades_ss1kke.jpg",
    categoryId: "1",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Chilaquiles a la francisca",
    description: "Chilaquiles verdes con camarón y queso, receta especial de la casa",
    price: 170,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Chilaquiles_a_la_francisca_170_Cat._Especialidades_akdyit.jpg",
    categoryId: "1",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Ensalada Champotonera",
    description: "Ensalada fresca con pulpo, camarón y verduras de temporada",
    price: 400,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Ensalada_Champotonera_400_Cat._Especialidades_ryavpm.jpg",
    categoryId: "1",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "Pan de Cazón",
    description: "Platillo tradicional con capas de tortilla, frijol y cazón en salsa",
    price: 180,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Pan_de_Caz%C3%B3n_180._Cat._Especialidades_y3kvkj.jpg",
    categoryId: "1",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "Coctel de Camarón",
    description: "Copa jumbo con camarones frescos, aguacate y salsa cóctel",
    price: 180,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Coctel_de_Camar%C3%B3n_copa_Jumbo_180._Cat._cocteles_dxhkrw.jpg",
    categoryId: "2",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Panucho de camarón en ensalada",
    description: "Panucho crujiente con camarones y ensalada fresca encima",
    price: 50,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775121/Panucho_de_camar%C3%B3n_en_ensalada_50_pesos_Cat._Panuchos_ozodgh.jpg",
    categoryId: "3",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "8",
    name: "Sopa de mariscos",
    description: "Caldo caliente con mix de mariscos, ideal para reconfortar",
    price: 230,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775103/Sopa_de_mariscos_230._Cat_Caldos_divsmj.jpg",
    categoryId: "4",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "9",
    name: "Ensalada de Pulpo",
    description: "Pulpo tierno en trozos, acompañado de verduras y aderezo especial",
    price: 230,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Ensala_de_Pulpo_grande_230_Cat._Ensaladas_n20ohd.jpg",
    categoryId: "5",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "10",
    name: "Papas a la francesa",
    description: "Porción de papas crujientes, perfectas como acompañamiento",
    price: 60,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/papas_a_la_francesa_60_Cat._Extras_u4zvtw.jpg",
    categoryId: "6",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "11",
    name: "Tostada de Ceviche de pescado",
    description: "Tostada con ceviche fresco de pescado marinado en limón",
    price: 35,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Tostada_de_Ceviche_de_pescado_35._Cat._Tacos_y_tostadas_rp6xdt.jpg",
    categoryId: "7",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: "12",
    name: "Pescado Frito",
    description: "Frito al momento, elige entre varias especies disponibles (precio varía)",
    price: 0,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Pescado_Frito_pregunte_por_variedad_y_precio._me33ak.jpg",
    categoryId: "1",
    isAvailable: true,
    createdAt: new Date(),
  },
];

export async function getProducts(): Promise<Product[]> {
  try {
    return initialProducts
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return initialProducts
  }
}