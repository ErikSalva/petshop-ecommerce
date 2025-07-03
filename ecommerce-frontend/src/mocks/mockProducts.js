const products = [
  {
    id: "64a1f4e5d9a2fc13b417a1d2",
    title: "Alimento Premium para Perros",
    slug: "alimento-premium-para-perros",
    petType: "dog",
    breedSizes: ["small", "medium"],
    description: "Alimento balanceado para perros adultos de razas grandes.",
    composition: ["Carne vacuna", "Cereales seleccionados", "Vitaminas y minerales"],
    images: ["comidaperro.png", "comidaperro2.png", "comidaperro3.png"],
    variants: [
      { id: "64b1f4e5d9a2fc13b417a1a1", weightValue: "1", weightUnit: "kg", price: 2500, stock: 10,},
      { id: "64b1f4e5d9a2fc13b417a1a2", weightValue: "3", weightUnit: "kg", price: 6000, stock: 5,},
      { id: "64b1f4e5d9a2fc13b417a1a3", weightValue: "5", weightUnit: "kg", price: 9500, stock: 2}
    ],
    reviews: {
      averageRating: 4.5,
      totalReviews: 10,
      data: [
        { id: "64b1f4e5d9a2fc13b417a1b1", user: "Sofía", rating: 5, date: "2025-05-20" },
        { id: "64b1f4e5d9a2fc13b417a1b2", user: "Marcos", rating: 4, date: "2025-05-21" }
      ]
    }
  },
  {
    id: "64a2f5a1e9b3df22c518b2c3",
    title: "Comida Húmeda de Atún para Gatos",
    slug: "comida-humeda-atun-gatos",
    petType: "cat",
    breedSizes: ["small", "medium"],
    description: "Delicioso atún en salsa, ideal para gatos exigentes.",
    composition: ["Atún", "Salsa natural", "Taurina", "Vitaminas"],
    images: ["comidaperro.png"],
    variants: [
      { id: "64b2f5a1e9b3df22c518b2a1", weightValue: "85", weightUnit: "g", price: 800, stock: 25 }
    ],
    reviews: {
      averageRating: 4.8,
      totalReviews: 5,
      data: [
        { id: "64b2f5a1e9b3df22c518b2b1", user: "Lucía", rating: 5, date: "2025-05-10" }
      ]
    }
  },
  {
    id: "64a3f6c2f1c4ab34d619c3e4",
    title: "Mix de Semillas Nutritivas para Aves",
    slug: "mix-semillas-aves",
    petType: "bird",
     breedSizes: ["small"],
    description: "Alimento completo para aves pequeñas y medianas.",
    composition: ["Mijo", "Alpiste", "Semillas de girasol", "Vitaminas A, D y E"],
    images: ["comidaperro.png"],
    variants: [
      { id: "64b3f6c2f1c4ab34d619c3a1", weightValue: "500", weightUnit: "g", price: 1500, stock: 12 }
    ],
    reviews: {
      averageRating: 4.3,
      totalReviews: 3,
      data: [
        { id: "64b3f6c2f1c4ab34d619c3b1", user: "Carlos", rating: 4, date: "2025-05-15" }
      ]
    }
  },
  {
    id: "64a4f7d3g2d5bc45e720d4f5",
    title: "Escamas Nutritivas para Peces Tropicales",
    slug: "escamas-nutritivas-peces",
    petType: "fish",
    breedSizes: ["large"],
    description: "Fórmula flotante rica en nutrientes esenciales para peces.",
    composition: ["Proteína marina", "Espinaca deshidratada", "Omega 3"],
    images: ["comidaperro.png"],
    variants: [
      { id: "64b4f7d3g2d5bc45e720d4a1", weightValue: "100", weightUnit: "g", price: 1200, stock: 15 }
    ],
    reviews: {
      averageRating: 4.7,
      totalReviews: 8,
      data: [
        { id: "64b4f7d3g2d5bc45e720d4b1", user: "Andrea", rating: 5, date: "2025-05-12" },
        { id: "64b4f7d3g2d5bc45e720d4b2", user: "Lucas", rating: 4, date: "2025-05-13" }
      ]
    }
  },  
  {
    id: "64a5f8e4h3e6cd56f821e6g6",
    title: "Snack Dental para Perros",
    slug: "snack-dental-perros",
    petType: "dog",
     breedSizes: ["small", "medium", "large"],
    description: "Premio masticable que ayuda a la limpieza dental de tu perro.",
    composition: ["Carne de pollo", "Clorofila", "Minerales"],
    images: ["comidaperro.png"],
    variants: [
      { id: "64b5f8e4h3e6cd56f821e6a1", weightValue: "200", weightUnit: "g", price: 1800, stock: 20 },
      { id: "64b5f8e4h3e6cd56f821e6a2", weightValue: "400", weightUnit: "g", price: 3200, stock: 10 }
    ],
    reviews: {
      averageRating: 4.6,
      totalReviews: 7,
      data: [
        { id: "64b5f8e4h3e6cd56f821e6b1", user: "Valentina", rating: 5, date: "2025-05-25" }
      ]
    }
  },
  {
    id: "64a6f9f5i4f7de67g922f7h7",
    title: "Arena Sanitaria Aglomerante para Gatos",
    slug: "arena-aglomerante-gatos",
    petType: "cat",
    breedSizes: ["small", "medium", "large"],
    description: "Arena mineral de alta absorción y control de olores.",
    composition: ["Bentonita", "Fragancia natural"],
    images: ["comidaperro.png", "comidaperro.png", "comidaperro.png"],
    variants: [
      { id: "64b6f9f5i4f7de67g922f7a1", weightValue: "5", weightUnit: "kg", price: 4500, stock: 8 }
    ],
    reviews: {
      averageRating: 4.9,
      totalReviews: 9,
      data: [
        { id: "64b6f9f5i4f7de67g922f7b1", user: "Martín", rating: 5, date: "2025-05-26" }
      ]
    }
  },
  {
    id: "64a7g0g6j5g8ef78h023g8i8",
    title: "Bloque Nutritivo para Peces de Agua Fría",
    slug: "bloque-nutritivo-peces-fríos",
    petType: "fish",
    breedSizes: ["small", "medium", "large"],
    description: "Bloque alimenticio de disolución lenta ideal para vacaciones.",
    composition: ["Harina de pescado", "Alga spirulina", "Calcio"],
    images: ["comidaperro.png"],
    variants: [
      { id: "64b7g0g6j5g8ef78h023g8a1", weightValue: "50", weightUnit: "g", price: 1000, stock: 18 }
    ],
    reviews: {
      averageRating: 4.4,
      totalReviews: 6,
      data: [
        { id: "64b7g0g6j5g8ef78h023g8b1", user: "Nicolás", rating: 4, date: "2025-05-22" }
      ]
    }
  },
  {
    id: "64a8h1h7k6h9fg89i124h9j9",
    title: "Barritas Energéticas para Aves",
    slug: "barritas-energeticas-aves",
    petType: "bird",
    breedSizes: ["small"],
    description: "Suplemento en forma de barrita con semillas y miel.",
    composition: ["Miel", "Semillas mixtas", "Frutas secas"],
    images: ["comidaperro.png"],
    variants: [
      { id: "64b8h1h7k6h9fg89i124h9a1", weightValue: "100", weightUnit: "g", price: 1300, stock: 14 }
    ],
    reviews: {
      averageRating: 4.2,
      totalReviews: 4,
      data: [   
        { id: "64b8h1h7k6h9fg89i124h9b1", user: "Rocío", rating: 4, date: "2025-05-19" }
      ]
    }
  },
  {
    id: "64a9i2i8l7i0gh90j225i0k0",
    title: "Leche Especial para Gatitos",
    slug: "leche-especial-gatitos",
    petType: "cat",
    breedSizes: ["small"],
    description: "Fórmula láctea sin lactosa, ideal para gatos lactantes o débiles.",
    composition: ["Caseína", "Vitaminas A y D", "Ácidos grasos esenciales"],
    images: ["comidaperro.png"],
    variants: [
      { id: "64b9i2i8l7i0gh90j225i0a1", weightValue: "250", weightUnit: "ml", price: 2200, stock: 9 },
      { id: "64b9i2i8l7i0gh90j225i0a2", weightValue: "500", weightUnit: "ml", price: 3900, stock: 4 }
    ],
    reviews: {
      averageRating: 4.7,
      totalReviews: 6,
      data: [
        { id: "64b9i2i8l7i0gh90j225i0b1", user: "Gabriela", rating: 5, date: "2025-05-28" }
      ]
    }
  },
  
  {
    "id": "64a16p5s5t4q7rs67t992s7s",
    "title": "Alimento para Gatos Castrados",
    "slug": "alimento-gatos-castrados",
    "petType": "cat",
    "breedSizes": ["small", "medium", "large"],
    "description": "Fórmula baja en calorías para prevenir obesidad en gatos castrados.",
    "composition": ["Pollo", "Arroz integral", "Fibras naturales", "L-Carnitina"],
    "images": ["comidaperro.png"],
    "variants": [
      { "id": "64b16p5s5t4q7rs67t992s7a", "weightValue": "1.5", "weightUnit": "kg", "price": 4200, "stock": 8 },
      { "id": "64b16p5s5t4q7rs67t992s7b", "weightValue": "3", "weightUnit": "kg", "price": 7800, "stock": 4 }
    ],
    "reviews": {
      "averageRating": 4.7,
      "totalReviews": 11,
      "data": [
        { "id": "64b16p5s5t4q7rs67t992s7c", "user": "Ana", "rating": 5, "date": "2025-06-07" }
      ]
    }
  },
  {
    "id": "64a17q6t6u5r8st78u003t8t",
    "title": "Snacks de Hígado Deshidratado para Perros",
    "slug": "snacks-higado-perros",
    "petType": "dog",
    "breedSizes": ["small", "medium", "large"],
    "description": "Premios 100% naturales ricos en hierro y proteínas.",
    "composition": ["Hígado de res", "Vitamina E"],
    "images": ["comidaperro.png"],
    "variants": [
      { "id": "64b17q6t6u5r8st78u003t8a", "weightValue": "150", "weightUnit": "g", "price": 2900, "stock": 20 }
    ],
    "reviews": {
      "averageRating": 4.9,
      "totalReviews": 15,
      "data": [
        { "id": "64b17q6t6u5r8st78u003t8b", "user": "Roberto", "rating": 5, "date": "2025-06-08" }
      ]
    }
  },
  {
    "id": "64a19s8v8w7t0uv90w225v0v",
    "title": "Mezcla de Frutas para Aves Exóticas",
    "slug": "mezcla-frutas-aves-exoticas",
    "petType": "bird",
    "breedSizes": ["small"],
    "description": "Combinación de frutas deshidratadas para loros y periquitos.",
    "composition": ["Manzana", "Plátano", "Coco", "Piña"],
    "images": ["comidaperro.png"],
    "variants": [
      { "id": "64b19s8v8w7t0uv90w225v0a", "weightValue": "200", "weightUnit": "g", "price": 2100, "stock": 10 }
    ],
    "reviews": {
      "averageRating": 4.8,
      "totalReviews": 7,
      "data": [
        { "id": "64b19s8v8w7t0uv90w225v0b", "user": "Daniel", "rating": 5, "date": "2025-06-10" }
      ]
    }
  },
  {
    "id": "64a18r7u7v6s9tu89v114u9u",
    "title": "Gel Nutritivo para Peces Betta",
    "slug": "gel-nutritivo-peces-betta",
    "petType": "fish",
    "breedSizes": ["small"],
    "description": "Alimento en gel con proteínas de alta digestibilidad para Bettas.",
    "composition": ["Camarón", "Agar-agar", "Espirulina", "Vitamina B"],
    "images": ["comidaperro.png"],
    "variants": [
      { "id": "64b18r7u7v6s9tu89v114u9a", "weightValue": "50", "weightUnit": "g", "price": 1600, "stock": 12 }
    ],
    "reviews": {
      "averageRating": 4.5,
      "totalReviews": 6,
      "data": [
        { "id": "64b18r7u7v6s9tu89v114u9b", "user": "Elena", "rating": 4, "date": "2025-06-09" }
      ]
    }
  },
  {
    "id": "64a19s8v8w7t0uv90w225v0v",
    "title": "Mezcla de Frutas para Aves Exóticas",
    "slug": "mezcla-frutas-aves-exoticas",
    "petType": "bird",
    "breedSizes": ["small"],
    "description": "Combinación de frutas deshidratadas para loros y periquitos.",
    "composition": ["Manzana", "Plátano", "Coco", "Piña"],
    "images": ["comidaperro.png"],
    "variants": [
      { "id": "64b19s8v8w7t0uv90w225v0a", "weightValue": "200", "weightUnit": "g", "price": 2100, "stock": 10 }
    ],
    "reviews": {
      "averageRating": 4.8,
      "totalReviews": 7,
      "data": [
        { "id": "64b19s8v8w7t0uv90w225v0b", "user": "Daniel", "rating": 5, "date": "2025-06-10" }
      ]
    }
  },
  {
    "id": "64a20t9x9x8u1vw01x336w1w",
    "title": "Comida Húmeda para Perros con Cordero",
    "slug": "comida-humeda-cordero-perros",
    "petType": "dog",
    "breedSizes": ["small", "medium"],
    "description": "Receta gourmet con cordero y vegetales para perros adultos.",
    "composition": ["Cordero", "Zanahoria", "Arroz", "Aceite de coco"],
    "images": ["comidaperro.png"],
    "variants": [
      { "id": "64b20t9x9x8u1vw01x336w1a", "weightValue": "400", "weightUnit": "g", "price": 3200, "stock": 14 }
    ],
    "reviews": {
      "averageRating": 4.6,
      "totalReviews": 9,
      "data": [
        { "id": "64b20t9x9x8u1vw01x336w1b", "user": "Isabel", "rating": 5, "date": "2025-06-11" }
      ]
    }
  },
  {
    "id": "64a21u0y0y9v2wx12y447x2x",
    "title": "Alimento para Gatos con Pelo Largo",
    "slug": "alimento-gatos-pelo-largo",
    "petType": "cat",
    "breedSizes": ["medium", "large"],
    "description": "Fórmula con aceites esenciales para reducir bolas de pelo.",
    "composition": ["Salmón", "Aceite de pescado", "Fibra de psyllium", "Vitamina E"],
    "images": ["comidaperro.png"],
    "variants": [
      { "id": "64b21u0y0y9v2wx12y447x2a", "weightValue": "2", "weightUnit": "kg", "price": 4800, "stock": 6 }
    ],
    "reviews": {
      "averageRating": 4.9,
      "totalReviews": 13,
      "data": [
        { "id": "64b21u0y0y9v2wx12y447x2b", "user": "Héctor", "rating": 5, "date": "2025-06-12" }
      ]
    }
  }

  
];

export default products;
