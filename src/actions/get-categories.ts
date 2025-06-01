'use server'

import { Category } from "@/lib/types"

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Especialidades",
    image: "https://example.com/images/especialidades.jpg",
  },
  {
    id: "2",
    name: "Cocteles",
    image: "https://example.com/images/cocteles.jpg",
  },
  {
    id: "3",
    name: "Panuchos",
    image: "https://example.com/images/panuchos.jpg",
  },
  {
    id: "4",
    name: "Caldos",
    image: "https://example.com/images/caldos.jpg",
  },
  {
    id: "5",
    name: "Ensaladas",
    image: "https://example.com/images/ensaladas.jpg",
  },
  {
    id: "6",
    name: "Extras",
    image: "https://example.com/images/extras.jpg",
  },
  {
    id: "7",
    name: "Tacos y tostadas",
    image: "https://example.com/images/tacos-y-tostadas.jpg",
  }
];



export async function getCategories(): Promise<Category[]> {

  try {
    return initialCategories
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return initialCategories
  }
}