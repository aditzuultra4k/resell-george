import type { OrderRequest, Product } from "@/lib/types";

export const demoProducts: Product[] = [
  {
    id: "demo-1",
    name: "Nike Dunk Low Panda",
    slug: "nike-dunk-low-panda",
    brand: "Nike",
    category: "adidasi",
    price: 649,
    description: "Pereche verificata, silueta iconica alb-negru, potrivita pentru daily wear.",
    condition: "foarte_buna",
    status: "disponibil",
    authenticity_notes: "Cutie originala si poze detaliate la cerere.",
    proof_url: null,
    seo_title: "Nike Dunk Low Panda - Resell verificat",
    seo_description: "Nike Dunk Low Panda disponibil in stoc pe marimi, cu autenticitate verificata.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: "img-1", product_id: "demo-1", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop", alt: "Nike Dunk Low Panda", sort_order: 0 }],
    product_sizes: [
      { id: "s1", product_id: "demo-1", size: "40", stock: 1, sort_order: 1 },
      { id: "s2", product_id: "demo-1", size: "41", stock: 2, sort_order: 2 },
      { id: "s3", product_id: "demo-1", size: "42", stock: 0, sort_order: 3 }
    ]
  },
  {
    id: "demo-2",
    name: "Supreme Box Logo Hoodie",
    slug: "supreme-box-logo-hoodie",
    brand: "Supreme",
    category: "hanorace",
    price: 1299,
    description: "Hoodie premium cu fit relaxat si print curat, piesa statement pentru colectie.",
    condition: "purtat",
    status: "disponibil",
    authenticity_notes: "Proof of purchase disponibil.",
    proof_url: null,
    seo_title: "Supreme Box Logo Hoodie - Streetwear resell",
    seo_description: "Supreme Box Logo Hoodie cu proof of authenticity si livrare rapida.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_images: [{ id: "img-2", product_id: "demo-2", url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1600&auto=format&fit=crop", alt: "Supreme Hoodie", sort_order: 0 }],
    product_sizes: [
      { id: "s4", product_id: "demo-2", size: "M", stock: 1, sort_order: 1 },
      { id: "s5", product_id: "demo-2", size: "L", stock: 1, sort_order: 2 },
      { id: "s6", product_id: "demo-2", size: "XL", stock: 0, sort_order: 3 }
    ]
  }
];

export const demoRequests: OrderRequest[] = [];
