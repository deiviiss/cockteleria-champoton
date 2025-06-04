import { Category, Product, Promotion, User } from "@/lib/types";
import { randomUUID } from "crypto";

const initialCategories: Category[] = [
  {
    id: "de216754-a8d0-421f-9b4e-a315a5cf1b40",
    name: "Especialidades",
    image: "https://example.com/images/especialidades.jpg",
  },
  {
    id: "7e99aa7e-e8ae-484a-9829-f072fd432a2e",
    name: "Cocteles",
    image: "https://example.com/images/cocteles.jpg",
  },
  {
    id: "88489907-3dc8-4b26-8f11-6c5eca29e5fe",
    name: "Panuchos",
    image: "https://example.com/images/panuchos.jpg",
  },
  {
    id: "a324a18b-e096-47f5-b11e-5d1af8479536",
    name: "Caldos",
    image: "https://example.com/images/caldos.jpg",
  },
  {
    id: "a7668ab2-005f-458f-a225-a20aeb693efa",
    name: "Ensaladas",
    image: "https://example.com/images/ensaladas.jpg",
  },
  {
    id: "7c14a86f-6df3-48f7-ae55-32d3757b65c5",
    name: "Extras",
    image: "https://example.com/images/extras.jpg",
  },
  {
    id: "a9d4a616-bd9d-4670-b8a3-b2ee0acedd88",
    name: "Tacos y tostadas",
    image: "https://example.com/images/tacos-y-tostadas.jpg",
  },
  {
    id: "2a04d700-fcfa-408d-aca0-bdcb3d3ddc9b",
    name: "Promociones",
    image: "https://example.com/images/promociones.jpg",
  }
];

const initialPromotions: Promotion[] = [
  {
    id: randomUUID(),
    name: "Combo Playero",
    description: "Torres de mariscos + Coctel de camarón jumbo a precio especial.",
    discountPercentage: 15,
    originalPrice: 530, // 350 + 180
    promoPrice: 450,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748794461/paquete_de_oferta_ks1civ.jpg",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 días
    categoryId: "2a04d700-fcfa-408d-aca0-bdcb3d3ddc9b", // Especialidades
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Chilaquiles con Papas",
    description: "Chilaquiles a la francisca con papas a la francesa incluidas.",
    discountPercentage: 20,
    originalPrice: 230, // 170 + 60
    promoPrice: 185,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748794461/Chilaquiles_con_papa_mshtb4.jpg",
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    categoryId: "2a04d700-fcfa-408d-aca0-bdcb3d3ddc9b",
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ensalada Doble Pulpo",
    description: "Compra una ensalada de pulpo y llévate la segunda al 50%.",
    discountPercentage: 25,
    originalPrice: 460, // 230 x 2
    promoPrice: 345,
    image: 'https://res.cloudinary.com/dhyds3mnm/image/upload/v1748794461/ensalada_doble_de_pulpo_lea084.jpg',
    isActive: true,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    categoryId: "2a04d700-fcfa-408d-aca0-bdcb3d3ddc9b", // Ensaladas
    createdAt: new Date(),
  },
];

const initialProducts: Product[] = [
  {
    id: randomUUID(),
    name: "Torres de Mariscos",
    description: "Torre alta con mariscos frescos, ideal para compartir",
    price: 350,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Torres_de_Mariscos_grande_350._Cat._Especialidades_jco7tu.jpg",
    categoryId: "de216754-a8d0-421f-9b4e-a315a5cf1b40",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Molcajete de Mariscos",
    description: "Mariscos variados servidos al estilo tradicional en molcajete caliente",
    price: 400,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775105/Molcajete_de_Mariscos_400._Cat._Especialidades_ss1kke.jpg",
    categoryId: "de216754-a8d0-421f-9b4e-a315a5cf1b40",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Chilaquiles a la francisca",
    description: "Chilaquiles verdes con camarón y queso, receta especial de la casa",
    price: 170,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Chilaquiles_a_la_francisca_170_Cat._Especialidades_akdyit.jpg",
    categoryId: "de216754-a8d0-421f-9b4e-a315a5cf1b40",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ensalada Champotonera",
    description: "Ensalada fresca con pulpo, camarón y verduras de temporada",
    price: 400,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Ensalada_Champotonera_400_Cat._Especialidades_ryavpm.jpg",
    categoryId: "de216754-a8d0-421f-9b4e-a315a5cf1b40",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Pan de Cazón",
    description: "Platillo tradicional con capas de tortilla, frijol y cazón en salsa",
    price: 180,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Pan_de_Caz%C3%B3n_180._Cat._Especialidades_y3kvkj.jpg",
    categoryId: "de216754-a8d0-421f-9b4e-a315a5cf1b40",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Coctel de Camarón",
    description: "Copa jumbo con camarones frescos, aguacate y salsa cóctel",
    price: 180,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Coctel_de_Camar%C3%B3n_copa_Jumbo_180._Cat._cocteles_dxhkrw.jpg",
    categoryId: "7e99aa7e-e8ae-484a-9829-f072fd432a2e",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Panucho de camarón en ensalada",
    description: "Panucho crujiente con camarones y ensalada fresca encima",
    price: 50,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775121/Panucho_de_camar%C3%B3n_en_ensalada_50_pesos_Cat._Panuchos_ozodgh.jpg",
    categoryId: "88489907-3dc8-4b26-8f11-6c5eca29e5fe",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Sopa de mariscos",
    description: "Caldo caliente con mix de mariscos, ideal para reconfortar",
    price: 230,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775103/Sopa_de_mariscos_230._Cat_Caldos_divsmj.jpg",
    categoryId: "a324a18b-e096-47f5-b11e-5d1af8479536",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ensalada de Pulpo",
    description: "Pulpo tierno en trozos, acompañado de verduras y aderezo especial",
    price: 230,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Ensala_de_Pulpo_grande_230_Cat._Ensaladas_n20ohd.jpg",
    categoryId: "a7668ab2-005f-458f-a225-a20aeb693efa",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Papas a la francesa",
    description: "Porción de papas crujientes, perfectas como acompañamiento",
    price: 60,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/papas_a_la_francesa_60_Cat._Extras_u4zvtw.jpg",
    categoryId: "7c14a86f-6df3-48f7-ae55-32d3757b65c5",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Tostada de Ceviche de pescado",
    description: "Tostada con ceviche fresco de pescado marinado en limón",
    price: 35,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Tostada_de_Ceviche_de_pescado_35._Cat._Tacos_y_tostadas_rp6xdt.jpg",
    categoryId: "a9d4a616-bd9d-4670-b8a3-b2ee0acedd88",
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Pescado Frito",
    description: "Frito al momento, elige entre varias especies disponibles (precio varía)",
    price: 0,
    image: "https://res.cloudinary.com/dhyds3mnm/image/upload/v1748775104/Pescado_Frito_pregunte_por_variedad_y_precio._me33ak.jpg",
    categoryId: "de216754-a8d0-421f-9b4e-a315a5cf1b40",
    isAvailable: true,
    createdAt: new Date(),
  },
];

const initialUsers: User[] = [
  {
    id: randomUUID(),
    name: "Juan Perez",
    phoneNumber: "123456789",
    role: "admin",
    password: "123456",
    createdAt: new Date(),
  },
]