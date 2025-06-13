import { Category, Product, ProductOption, Promotion, Role, User } from "@/lib/types";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { PhoneNumberMenu } from "@prisma/client";
import prisma from "@/lib/prisma";

// Category data
const initialCategories: Category[] = [
  { id: randomUUID(), name: "Especialidades (menú frío)", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Especialidades (menú caliente)", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Cocteles", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Ensaladas", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Panuchos", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Empanadas", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Extras", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Tacos y tostadas", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Chilaquiles", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Huevo", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Filete de pollo", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Promociones", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Pescado Frito", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Nuevas Especialidades", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Refrescos", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
  { id: randomUUID(), name: "Aguas Naturales", image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp" },
];

// Stores the category IDs for use in product and promotion data
const categoryIds = initialCategories.reduce((acc, category) => {
  acc[category.name] = category.id;
  return acc;
}, {} as Record<string, string>);


// Product data
const initialProducts: Product[] = [
  // CÓCTELES (con tamaños como opciones, excepto Mixto)
  {
    id: randomUUID(),
    name: "Cóctel de Camarón pacotilla",
    description: "Cóctel fresco con camarón pacotilla",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Cocteles"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Cóctel de Camarón cóctelero",
    description: "Cóctel fresco con camarón cóctelero",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820371/Coctel_de_Camar%C3%B3n_copa_Jumbo_180._Cat._cocteles_k9wens.jpg",
    categoryId: categoryIds["Cocteles"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Cóctel de Pulpo",
    description: "Cóctel fresco con pulpo (solo en temporada)",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Cocteles"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Cóctel de Caracol",
    description: "Cóctel fresco con caracol",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Cocteles"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Cóctel de Ostión",
    description: "Cóctel fresco con ostiones",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Cocteles"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Cóctel de Jaiva",
    description: "Cóctel fresco con jaiva",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Cocteles"],
    isAvailable: true,
    createdAt: new Date(),
  },
  // CÓCTELES (Mixto con precio fijo y opciones de tamaño)
  {
    id: randomUUID(),
    name: "Cóctel Mixto",
    description: "Cóctel mixto con variedad de mariscos",
    price: 180,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Cocteles"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // TACOS Y TOSTADAS (sin opciones, precio fijo)
  {
    id: randomUUID(),
    name: "Camarón en ensalada",
    description: "Taco o tostada con camarón en ensalada",
    price: 50,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820372/camaron_tostada_iwoa2v.jpg",
    categoryId: categoryIds["Tacos y tostadas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarón empanizado",
    description: "Taco o tostada con camarón empanizado",
    price: 40,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749826585/tostada_camaron_empanizado_mfvunp.jpg",
    categoryId: categoryIds["Tacos y tostadas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarón al mojo de ajo",
    description: "Taco o tostada con camarón al mojo de ajo",
    price: 40,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820366/tostada_camaron_al_mojo_de_ajo_dkp0tz.jpg",
    categoryId: categoryIds["Tacos y tostadas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ceviche de pescado",
    description: "Taco o tostada con ceviche de pescado",
    price: 40,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820368/Tostada_de_Ceviche_de_pescado_35._Cat._Tacos_y_tostadas_yiktwr.jpg",
    categoryId: categoryIds["Tacos y tostadas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Filete de pescado empanizado",
    description: "Taco o tostada con filete de pescado empanizado",
    price: 40,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Tacos y tostadas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Tacos suizos",
    description: "Tacos suizos con relleno especial",
    price: 55,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Tacos y tostadas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Tortilla de harina",
    description: "Taco en tortilla de harina con relleno a elegir",
    price: 55,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Tacos y tostadas"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // PANUCHOS (sin opciones, precio fijo)
  {
    id: randomUUID(),
    name: "Camarón en ensalada",
    description: "Panucho con camarón en ensalada",
    price: 50,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Panuchos"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Cazón frito",
    description: "Panucho con cazón frito",
    price: 25,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Panuchos"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // EMPANADAS (sin opciones, precio fijo, excepto Orden de 5)
  {
    id: randomUUID(),
    name: "Cazón frito",
    description: "Empanada rellena de cazón frito",
    price: 25,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820366/empanada_de_cazon_csnmcy.jpg",
    categoryId: categoryIds["Empanadas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarón",
    description: "Empanada rellena de camarón",
    price: 30,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Empanadas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarón con queso",
    description: "Empanada rellena de camarón con queso",
    price: 35,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820365/empanada_de_camaron_con_quesito_lxsjjw.jpg",
    categoryId: categoryIds["Empanadas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Orden de 5 empanadas",
    description: "Orden de 5 empanadas a elegir",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Empanadas"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // PESCADO FRITO (sin opciones, precio variable)
  {
    id: randomUUID(),
    name: "Pescado Frito",
    description: "Pescado frito fresco, variedad y precio sujetos a disponibilidad",
    price: 0, // Precio variable
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820366/Pescado_Frito_pregunte_por_variedad_y_precio._oaxlue.jpg",
    categoryId: categoryIds["Pescado Frito"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // ENSALADAS (con tamaños como opciones, excepto Mixto y Champotonera)
  {
    id: randomUUID(),
    name: "Ensalada de Camarón",
    description: "Ensalada fresca con camarones",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820365/ensalada_camaron_k0ub93.jpg",
    categoryId: categoryIds["Ensaladas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ensalada de Pulpo",
    description: "Ensalada fresca con pulpo",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820366/Ensala_de_Pulpo_grande_230_Cat._Ensaladas_drakr7.jpg",
    categoryId: categoryIds["Ensaladas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ensalada de Caracol",
    description: "Ensalada fresca con caracol",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Ensaladas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ensalada de Ostión",
    description: "Ensalada fresca con ostiones",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Ensaladas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ensalada de Jaiva",
    description: "Ensalada fresca con jaiva",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Ensaladas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  // ENSALADAS (Mixto y Champotonera con precio fijo y opciones de tamaño)
  {
    id: randomUUID(),
    name: "Ensalada Mixta",
    description: "Ensalada mixta con variedad de mariscos",
    price: 180,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Ensaladas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ensalada Champotonera",
    description: "Ensalada especial estilo Champotón",
    price: 0,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820367/Ensalada_Champotonera_400_Cat._Especialidades_e4zqyk.jpg",
    categoryId: categoryIds["Ensaladas"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ensalada Champotonera Mixta",
    description: "Ensalada especial estilo Champotón",
    price: 0,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820367/Ensalada_Champotonera_400_Cat._Especialidades_e4zqyk.jpg",
    categoryId: categoryIds["Ensaladas"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // ESPECIALIDADES (Menú Frío) (sin opciones, precio fijo)
  {
    id: randomUUID(),
    name: "Ceviche Mitotero",
    description: "Ceviche especial con mezcla de mariscos",
    price: 450,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú frío)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Molcajete de Mariscos",
    description: "Molcajete con variedad de mariscos frescos",
    price: 400,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820367/Molcajete_de_Mariscos_400._Cat._Especialidades_pvhsjc.jpg",
    categoryId: categoryIds["Especialidades (menú frío)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Aguachile a la Valentina",
    description: "Aguachile fresco con salsa Valentina",
    price: 230,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú frío)"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // NUEVAS ESPECIALIDADES (sin opciones, precio fijo)
  {
    id: randomUUID(),
    name: "Camarones a la Diabla",
    description: "Camarones picantes a la diabla",
    price: 240,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Nuevas Especialidades"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ángeles a caballo",
    description: "Ángeles a caballo, especialidad de la casa",
    price: 250,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Nuevas Especialidades"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Filete de pescado a las hierbas finas",
    description: "Filete de pescado con hierbas finas",
    price: 220,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Nuevas Especialidades"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Filete Champotón",
    description: "Filete especial estilo Champotón",
    price: 280,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Nuevas Especialidades"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarones hawaianos",
    description: "Camarones preparados al estilo hawaiano",
    price: 300,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Nuevas Especialidades"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Tostadas de callo de hacha",
    description: "Tostadas con callo de hacha",
    price: 80,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Nuevas Especialidades"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // ESPECIALIDADES (Menú Caliente) (con tamaños como opciones para Torre de mariscos)
  {
    id: randomUUID(),
    name: "Pan de cazón",
    description: "Platillo tradicional con capas de tortilla y cazón",
    price: 160,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820365/Pan_de_Caz%C3%B3n_180._Cat._Especialidades_xubrrl.jpg",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Pulpo a la vizcaína",
    description: "Pulpo en salsa vizcaína (solo en temporada)",
    price: 180,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820366/pulpo_a_la_viscaina_ue31mi.jpg",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarón empanizado",
    description: "Camarón empanizado servido caliente",
    price: 180,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820371/camarom_empanizado_bueno_afbgvv.jpg",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarón en escabeche",
    description: "Camarón en escabeche caliente",
    price: 180,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarón al coco",
    description: "Camarón preparado con coco",
    price: 210,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820372/Camarones_al_coco_la7onf.jpg",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarón al mojo de ajo",
    description: "Camarón al mojo de ajo caliente",
    price: 180,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarones arcoíris",
    description: "Camarones preparados al estilo arcoíris",
    price: 200,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarones al ajillo",
    description: "Camarones al ajillo caliente",
    price: 180,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarones a la mantequilla",
    description: "Camarones en salsa de mantequilla",
    price: 170,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Camarones pirata",
    description: "Camarones al estilo pirata",
    price: 210,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Filete de pescado empanizado",
    description: "Filete de pescado empanizado caliente",
    price: 170,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Filete de pescado a la plancha",
    description: "Filete de pescado a la plancha",
    price: 160,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Filete relleno de marisco",
    description: "Filete relleno con mariscos",
    price: 230,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Arroz a la tumbada",
    description: "Arroz con mariscos estilo tumbada",
    price: 220,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Chilpachole de camarón",
    description: "Sopa espesa de camarón",
    price: 200,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Sopa de mariscos",
    description: "Sopa caliente con mezcla de mariscos",
    price: 220,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820367/Sopa_mariscos_igqlry.jpg",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Torre de mariscos",
    description: "Torre alta con mariscos frescos",
    price: 0, // Precio definido en opciones
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820371/Torres_de_Mariscos_grande_350._Cat._Especialidades_uhknjm.jpg",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ceviche de pescado",
    description: "Ceviche fresco de pescado",
    price: 180,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ceviche de camarón",
    description: "Ceviche fresco de camarón",
    price: 220,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ceviche mixto",
    description: "Ceviche con mezcla de mariscos",
    price: 250,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Aguachile",
    description: "Aguachile fresco con mariscos",
    price: 220,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Aguachile negro",
    description: "Aguachile negro con mariscos",
    price: 220,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Manos de cangrejo",
    description: "Manos de cangrejo frescas",
    price: 220,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Especialidades (menú caliente)"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // CHILAQUILES (sin opciones, precio fijo)
  {
    id: randomUUID(),
    name: "Rojos",
    description: "Chilaquiles con salsa roja",
    price: 120,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Chilaquiles"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "A la francisca",
    description: "Chilaquiles verdes con camarón y queso",
    price: 170,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749826675/Chilaquiles_a_la_francisca_170_Cat._Especialidades_vjrsg5.jpg",
    categoryId: categoryIds["Chilaquiles"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // HUEVO (sin opciones, precio fijo)
  {
    id: randomUUID(),
    name: "Huevo con camarón",
    description: "Huevo revuelto con camarón",
    price: 140,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749820365/huevos_con_camaron_netupk.jpg",
    categoryId: categoryIds["Huevo"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Huevo con cazón",
    description: "Huevo revuelto con cazón",
    price: 120,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Huevo"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // FILETE DE POLLO (sin opciones, precio fijo)
  {
    id: randomUUID(),
    name: "Filete de pollo a la plancha",
    description: "Filete de pollo cocinado a la plancha",
    price: 130,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Filete de pollo"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Filete de pollo empanizado",
    description: "Filete de pollo empanizado y frito",
    price: 140,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Filete de pollo"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // EXTRAS (sin opciones, precio fijo)
  {
    id: randomUUID(),
    name: "Papas a la francesa",
    description: "Porción de papas fritas",
    price: 60,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Extras"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Orden de plátano frito",
    description: "Plátanos fritos dulces",
    price: 60,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Extras"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Orden de guacamole",
    description: "Guacamole fresco con totopos",
    price: 80,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Extras"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // REFRESCOS (sin opciones, precio fijo)
  {
    id: randomUUID(),
    name: "Coca cola retornable",
    description: "Botella de Coca-Cola retornable",
    price: 35,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Refrescos"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Coca-Cola",
    description: "Lata o botella de Coca-Cola desechable",
    price: 35,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Refrescos"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Coca-Cola zero",
    description: "Coca-Cola zero azúcar",
    price: 35,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Refrescos"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Agua mineral",
    description: "Botella de agua mineral",
    price: 35,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Refrescos"],
    isAvailable: true,
    createdAt: new Date(),
  },

  // AGUAS NATURALES (sin opciones, precio fijo)
  {
    id: randomUUID(),
    name: "Limonada de fresa",
    description: "Limonada fresca con sabor a fresa",
    price: 35,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Aguas Naturales"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Té",
    description: "Té frío natural",
    price: 35,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Aguas Naturales"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Horchata",
    description: "Horchata de arroz",
    price: 35,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Aguas Naturales"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Jamaica",
    description: "Agua de jamaica",
    price: 35,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Aguas Naturales"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Agua natural 600ml",
    description: "Botella de agua natural",
    price: 35,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    categoryId: categoryIds["Aguas Naturales"],
    isAvailable: true,
    createdAt: new Date(),
  },
];

// ProductOption data
const initialProductOptions: ProductOption[] = [
  // CÓCTELES (opciones de tamaño)
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Camarón pacotilla")!.id,
    name: "Copa Grande",
    price: 170,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Camarón pacotilla")!.id,
    name: "Copa Jumbo",
    price: 180,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Camarón cóctelero")!.id,
    name: "Copa Grande",
    price: 180,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Camarón cóctelero")!.id,
    name: "Copa Jumbo",
    price: 200,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Pulpo")!.id,
    name: "Copa Grande",
    price: 170,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Pulpo")!.id,
    name: "Copa Jumbo",
    price: 180,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Caracol")!.id,
    name: "Copa Grande",
    price: 170,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Caracol")!.id,
    name: "Copa Jumbo",
    price: 180,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Ostión")!.id,
    name: "Copa Grande",
    price: 170,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Ostión")!.id,
    name: "Copa Jumbo",
    price: 180,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel de Jaiva")!.id,
    name: "Copa Grande",
    price: 170,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel Mixto")!.id,
    name: "Copa Grande",
    price: 180,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel Mixto")!.id,
    name: "Copa Jumbo",
    price: 200,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },

  // EMPANADAS (opciones de tamaño para Orden de 5)
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Orden de 5 empanadas")!.id,
    name: "Cazón frito",
    price: 100,
    quantity: 0,
    isAvailable: true,
    type: "size"
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Orden de 5 empanadas")!.id,
    name: "Camarón",
    price: 120,
    quantity: 0,
    isAvailable: true,
    type: "size"
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Orden de 5 empanadas")!.id,
    name: "Camarón con queso",
    price: 140,
    quantity: 0,
    isAvailable: true,
    type: "size"
  },

  // ENSALADAS (opciones de tamaño para Camarón, Pulpo, etc.)
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada de Camarón")!.id,
    name: "Chica",
    price: 160,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada de Camarón")!.id,
    name: "Grande",
    price: 210,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada de Pulpo")!.id,
    name: "Chica",
    price: 160,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada de Pulpo")!.id,
    name: "Grande",
    price: 200,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada de Caracol")!.id,
    name: "Chica",
    price: 160,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada de Caracol")!.id,
    name: "Grande",
    price: 210,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada de Ostión")!.id,
    name: "Chica",
    price: 160,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada de Ostión")!.id,
    name: "Grande",
    price: 210,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada de Jaiva")!.id,
    name: "Chica",
    price: 160,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada de Jaiva")!.id,
    name: "Grande",
    price: 210,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Mixta")!.id,
    name: "Chica",
    price: 180,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Mixta")!.id,
    name: "Grande",
    price: 230,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Champotonera")!.id,
    name: "Chica",
    price: 180,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Champotonera")!.id,
    name: "Grande",
    price: 230,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Champotonera Mixta")!.id,
    name: "Chica",
    price: 210,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Champotonera Mixta")!.id,
    name: "Grande",
    price: 250,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },

  // ESPECIALIDADES (Menú Caliente) (opciones de tamaño para Torre de mariscos)
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Torre de mariscos")!.id,
    name: "Chica",
    price: 250,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Torre de mariscos")!.id,
    name: "Grande",
    price: 350,
    quantity: 0,
    isAvailable: true,
    type: "size",
  },

  // COCTELES (opciones de ingredientes para Mixto)
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel Mixto")!.id,
    name: "Ensalada de Camarón Pacotilla",
    price: 20, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel Mixto")!.id,
    name: "Camarón Cóctelero",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel Mixto")!.id,
    name: "Pulpo",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel Mixto")!.id,
    name: "Caracol",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel Mixto")!.id,
    name: "Ostión",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Cóctel Mixto")!.id,
    name: "Jaiva",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },


  // ENSALADAS (opciones de ingredientes para Mixto y Champotonera)
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Mixta")!.id,
    name: "Camarón Pacotilla",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Mixta")!.id,
    name: "Camarón Cóctelero",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Mixta")!.id,
    name: "Pulpo",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Mixta")!.id,
    name: "Caracol",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Mixta")!.id,
    name: "Ostión",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Mixta")!.id,
    name: "Jaiva",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Champotonera Mixta")!.id,
    name: "Camarón Pacotilla",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Champotonera Mixta")!.id,
    name: "Camarón Cóctelero",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Champotonera Mixta")!.id,
    name: "Pulpo",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Champotonera Mixta")!.id,
    name: "Caracol",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Champotonera Mixta")!.id,
    name: "Ostión",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  },
  {
    id: randomUUID(),
    productId: initialProducts.find(p => p.name === "Ensalada Champotonera Mixta")!.id,
    name: "Jaiva",
    price: 0, // Precio incluido en el producto base
    quantity: 0,
    isAvailable: true,
    type: "ingredient",
  }
];

// Promotion data
const initialPromotions: Promotion[] = [
  {
    id: randomUUID(),
    name: "Combo Playero",
    description: "Torres de mariscos + Cóctel de camarón jumbo a precio especial.",
    discountPercentage: 15,
    originalPrice: 530,
    promoPrice: 450,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    isActive: true,
    categoryId: categoryIds["Promociones"],
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Chilaquiles con Papas",
    description: "Chilaquiles a la francisca con papas a la francesa incluidas.",
    discountPercentage: 20,
    originalPrice: 230,
    promoPrice: 185,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    isActive: true,
    categoryId: categoryIds["Promociones"],
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Ensalada Doble Pulpo",
    description: "Compra una ensalada de pulpo y llévate la segunda al 50%.",
    discountPercentage: 25,
    originalPrice: 460,
    promoPrice: 345,
    image: "https://res.cloudinary.com/djq34ckkj/image/upload/v1749682954/placeholder_ugdi4t.webp",
    isActive: true,
    categoryId: categoryIds["Promociones"],
    createdAt: new Date(),
  },
];

// User data
const initialUsers: User[] = [
  {
    id: randomUUID(),
    name: "Edgar",
    phoneNumber: "+521234567890",
    role: Role.ADMIN,
    password: bcrypt.hashSync("admin123!", 10), // Hashed password
    createdAt: new Date(),
  },
];

// PhoneNumberMenu data
const initialPhoneNumberMenu: PhoneNumberMenu[] = [
  {
    id: randomUUID(),
    label: "menu",
    number: "+5219903715312",
    isActive: true,
    createdAt: new Date(),
  },
];

// Main function to run the seed
const seed = async () => {
  console.log("⏳ Limpiando base de datos...");
  await prisma.productOption.deleteMany();
  await prisma.product.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.phoneNumberMenu.deleteMany();

  console.log("⏳ Insertando categorías...");
  await prisma.category.createMany({ data: initialCategories });

  console.log("⏳ Insertando productos...");
  await prisma.product.createMany({ data: initialProducts });

  console.log("⏳ Insertando opciones de productos...");
  await prisma.productOption.createMany({ data: initialProductOptions });

  console.log("⏳ Insertando promociones...");
  await prisma.promotion.createMany({ data: initialPromotions });

  console.log("⏳ Insertando usuarios...");
  await prisma.user.createMany({ data: initialUsers });

  console.log("⏳ Insertando números de menú...");
  await prisma.phoneNumberMenu.createMany({ data: initialPhoneNumberMenu });

  console.log("✅ Seed completado");
};

const user = await prisma.user.findMany();

if (user.length === 0) {
  seed()
    .catch((e) => {
      console.error("❌ Error en el seed:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
