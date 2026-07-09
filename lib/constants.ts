export const categories = [
  { value: "adidasi", label: "Adidasi" },
  { value: "hanorace", label: "Hanorace" },
  { value: "tricouri", label: "Tricouri" },
  { value: "geci", label: "Geci" },
  { value: "pantaloni", label: "Pantaloni" },
  { value: "accesorii", label: "Accesorii" }
] as const;

export const conditions = [
  { value: "nou", label: "Nou" },
  { value: "purtat", label: "Purtat" },
  { value: "foarte_buna", label: "Foarte buna" }
] as const;

export const productStatuses = [
  { value: "disponibil", label: "Disponibil" },
  { value: "sold_out", label: "Sold out" }
] as const;

export const requestStatuses = [
  { value: "noua", label: "Noua" },
  { value: "contactat", label: "Contactat" },
  { value: "rezervat", label: "Rezervat" },
  { value: "vandut", label: "Vandut" },
  { value: "anulata", label: "Anulata" }
] as const;

export const siteConfig = {
  name: "Resell George",
  description: "Haine si adidasi streetwear autentificati, atent selectati pentru resell premium.",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
};
