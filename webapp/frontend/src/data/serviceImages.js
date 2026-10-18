// Images live in frontend/public/images/outfits/. Paths are kept independent of the API.
const image = (name) => `${import.meta.env.BASE_URL}images/outfits/${name}.webp`;

export const processImages = [
  image("service-styling"),
  image("service-capsule-wardrobe"),
  image("summer-capsule"),
  image("autumn-outfit"),
];

const bySlug = {
  "kapsula-online": {
    hero: image("service-capsule-wardrobe"),
    gallery: ["capsule-outfit-combinations", "outfit-earth-tones", "summer-capsule", "outfit-casual-neutral"].map(image),
  },
  "soprovozhdenie-na-shoping": {
    hero: image("outfit-personal-shopping"),
    gallery: ["service-wardrobe-review", "service-styling", "outfit-casual-neutral", "autumn-outfit"].map(image),
  },
  "shop-tur": {
    hero: image("autumn-outfit"),
    gallery: ["outfit-personal-shopping", "outfit-earth-tones", "summer-look", "service-styling"].map(image),
  },
};

export const getServiceImages = (slug) => bySlug[slug] ?? { hero: null, gallery: [] };
