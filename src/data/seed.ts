import type {
  InstagramPost,
  Order,
  Product,
  Review,
  SiteSettings,
} from "@/lib/types";

export const siteSettings: SiteSettings = {
  businessName: "Simply Sourdough",
  tagline: "Beautiful breads & delightful buns inspired by Sweden",
  email: "farid@simplysourdough.shop",
  phone: "+61 478 481 989",
  whatsapp: "+61478481989",
  address: "Embassy Arcade, 3/97 Keen St",
  city: "Lismore NSW 2480, Australia",
  hours: "Mon, Wed & Fri · 8:00 AM – sold out",
  instagramUrl: "https://www.instagram.com/simplysourdough2023/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61551937266868",
  googleReviewsUrl: "https://share.google/n2bqUz1UaKPGnJzbU",
  aboutStory:
    "Farid’s passion for sourdough ignited in his childhood, watching his mother create magic in the kitchen. Over 14 years he honed his craft as a baker in Denmark and Sweden. Four years ago he moved to Lismore and founded Simply Sourdough — a micro-bakery celebrating traditional Nordic recipes with only fresh, natural ingredients and slow fermentation.",
};

const now = new Date().toISOString();

export const seedProducts: Product[] = [
  {
    id: "624",
    name: "Signature Country Sourdough",
    slug: "the-simply-sourdough",
    price: 10,
    currency: "AUD",
    shortDescription:
      "Our classic 900g Simply Sourdough — deep flavour, crackling crust, slow fermented over two days.",
    description:
      "Handcrafted artisan country loaf made with sustainable stone-milled grains. Perfect for soup, sandwiches, or morning toast.",
    ingredients:
      "Sustainable premium white wheat flour, rye flour, spelt flour, emmer flour (Wholegrain Milling), filtered water, pink lake salt (Mount Zero).",
    allergens: "May contain traces of milk, egg, soy, peanuts, sesame seeds and tree nuts.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sour1.png",
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sour2.png",
    ],
    category: "Sourdough Bread",
    featured: true,
    inStock: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "623",
    name: "Community Sourdough",
    slug: "community-sourdough",
    price: 10,
    currency: "AUD",
    shortDescription:
      "Our 900g classic community sourdough — organic or sustainable regional grains, stone baked.",
    description:
      "Simply sourdough bread made from organic or sustainable stone milled regional grains. Handcrafted, slow fermented over two days and stone baked for deep flavours and a delicious crust.",
    ingredients:
      "Sustainable premium white wheat flour, rye flour, spelt flour, emmer flour (Wholegrain Milling), filtered water, pink lake salt (Mount Zero).",
    allergens: "May contain traces of milk, egg, soy, peanuts, sesame seeds and tree nuts.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sour2-1.png",
      "https://simplysourdough.shop/wp-content/uploads/2023/08/product_06-640x640-1.png",
    ],
    category: "Sourdough Bread",
    featured: true,
    inStock: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "622",
    name: "Danish Rye Sourdough",
    slug: "danish-rye-sourdough",
    price: 12,
    currency: "AUD",
    shortDescription:
      "800g whole-grain 100% rye — dense, soft crumb with a gentle seed crunch.",
    description:
      "A traditional Danish rye loaf with fewer carbohydrates and more fibre. Soft crust, dense but soft crumb, and a slight crunch from moist seeds.",
    ingredients:
      "Organic rye flour, organic broken and whole rye grains, flax seeds, sunflower seeds, malt, water, sourdough, sea salt. Sprinkled with rough rolled rye flakes.",
    allergens: "Contains sesame seeds. May contain traces of milk, egg, soy, peanuts and tree nuts.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/unnamed-1.png",
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sourn1.png",
    ],
    category: "Sourdough Bread",
    featured: true,
    inStock: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "595",
    name: "Cardamom Buns",
    slug: "cardamom-buns",
    price: 5,
    currency: "AUD",
    shortDescription: "Classic Swedish cardamom buns — fragrant, buttery, and soft.",
    description:
      "Our classic Swedish cardamom buns. Available as a single bun or a 6-pack.",
    ingredients:
      "Sustainable premium white wheat flour (Wholegrain Milling), filtered water, butter, caster sugar, yeast, almond meal, cardamom, pink lake salt, vanilla essence.",
    allergens:
      "Contains almond. May contain traces of milk, egg, soy, peanuts, sesame seeds and tree nuts.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/c1.png",
      "https://simplysourdough.shop/wp-content/uploads/2023/08/c2.png",
    ],
    category: "buns",
    featured: true,
    inStock: true,
    variants: [
      { id: "933", name: "1 cardamom bun", price: 5 },
      { id: "932", name: "6 cardamom buns", price: 25 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "784",
    name: "Cinnamon Buns",
    slug: "cinnamon-buns",
    price: 5,
    currency: "AUD",
    shortDescription: "A classic Swedish cinnamon bun pack — pure bakery comfort.",
    description:
      "Our classic Swedish cinnamon buns. Transported us right back to Sweden. Available as a single or 6-pack.",
    ingredients:
      "Sustainable premium white wheat flour (Wholegrain Milling), filtered water, butter, caster sugar, yeast, almond meal, cinnamon, pink lake salt (Mount Zero).",
    allergens:
      "Contains almond. May contain traces of milk, egg, soy, peanuts, sesame seeds and tree nuts.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/c2-1.png",
    ],
    category: "buns",
    featured: true,
    inStock: true,
    variants: [
      { id: "931", name: "1 cinnamon bun", price: 5 },
      { id: "930", name: "6 cinnamon buns", price: 25 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "733",
    name: "Pain au Chocolat",
    slug: "pain-au-chocolat",
    price: 8,
    currency: "AUD",
    shortDescription:
      "Croissant dough rolled with sticks of dark, bittersweet chocolate.",
    description:
      "Our classic pain au chocolat — flaky laminated dough and rich dark chocolate.",
    allergens: "Gluten, dairy, eggs, sulfites, chocolate.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/pain-au-choc-1.jpg",
    ],
    category: "pastry",
    featured: true,
    inStock: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "789",
    name: "Spandauer",
    slug: "spandauer",
    price: 7,
    currency: "AUD",
    shortDescription:
      "Croissant dough with rich pastry cream — similar to a Portuguese custard tart.",
    description:
      "A Nordic pastry classic: laminated dough filled with silky pastry cream.",
    allergens: "Gluten, dairy, eggs.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/spandauer.jpg",
    ],
    category: "pastry",
    featured: false,
    inStock: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "787",
    name: "Large Cheesecake",
    slug: "large-cheesecake",
    price: 20,
    currency: "AUD",
    shortDescription:
      "Basque-style cheesecake with a silky interior and caramelised crust.",
    description:
      "Our take on a Basque-style cheesecake. Silky smooth interior and caramelised crust from our unusual baking method.",
    allergens: "Gluten, dairy, eggs.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/stor_cheesecake-1.jpg",
    ],
    category: "pastry",
    featured: true,
    inStock: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "791",
    name: "Black Sesame Cookie",
    slug: "black-sesame-cookie",
    price: 6,
    currency: "AUD",
    shortDescription:
      "A thick black sesame cookie studded with white chocolate chips.",
    description:
      "Nutty black sesame meets creamy white chocolate in a thick, bakery-style cookie.",
    allergens: "Gluten, dairy, eggs, sesame, chocolate.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/black_sesame_cookie_top.jpg",
    ],
    category: "pastry",
    featured: false,
    inStock: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "851",
    name: "Weekly Bread Subscription",
    slug: "subscription",
    price: 40,
    currency: "AUD",
    shortDescription:
      "Fresh sourdough delivered on a weekly cadence — never miss a loaf.",
    description:
      "Subscribe for regular artisan breads. Choose your favourites and pick up fresh on bake days.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sour1.png",
    ],
    category: "subscription",
    featured: false,
    inStock: true,
    createdAt: now,
    updatedAt: now,
  },
];

/** Highlighted Google-style customer reviews for Simply Sourdough Lismore */
export const seedReviews: Review[] = [
  {
    id: "r1",
    author: "Sarah M.",
    rating: 5,
    text: "The best sourdough in the Northern Rivers. Farid’s loaves have that perfect crackle and deep flavour you only get from true slow fermentation. Cardamom buns are addictive!",
    date: "2025-11-12",
    source: "google",
    featured: true,
    avatarInitials: "SM",
  },
  {
    id: "r2",
    author: "James T.",
    rating: 5,
    text: "Authentic Scandinavian baking right here in Lismore. Danish rye is outstanding — dense, seedy, and so satisfying. Worth getting in early before they sell out.",
    date: "2025-10-03",
    source: "google",
    featured: true,
    avatarInitials: "JT",
  },
  {
    id: "r3",
    author: "Elena R.",
    rating: 5,
    text: "Pain au chocolat that rivals anything I’ve had in Europe. Fresh, flaky, and made with real care. Simply Sourdough is a gem for our community.",
    date: "2026-01-18",
    source: "google",
    featured: true,
    avatarInitials: "ER",
  },
  {
    id: "r4",
    author: "Michael K.",
    rating: 5,
    text: "Community sourdough is our household staple. Beautiful crust, soft open crumb, and no weird additives — just honest bread. Highly recommend.",
    date: "2026-02-22",
    source: "google",
    featured: true,
    avatarInitials: "MK",
  },
  {
    id: "r5",
    author: "Priya N.",
    rating: 5,
    text: "The Basque-style cheesecake is pure luxury. Silky inside, caramelised top — we ordered one for a birthday and everyone asked where it was from.",
    date: "2026-03-09",
    source: "google",
    featured: true,
    avatarInitials: "PN",
  },
  {
    id: "r6",
    author: "David L.",
    rating: 5,
    text: "Friendly service and bread that actually tastes like bread should. Supporting local artisans like Simply Sourdough is a no-brainer.",
    date: "2026-04-14",
    source: "google",
    featured: false,
    avatarInitials: "DL",
  },
];

/**
 * Curated Instagram highlights for @simplysourdough2023.
 * Thumbnails use stable bakery product imagery (IG CDN signed URLs expire).
 * Permalinks point to real Instagram posts from the profile.
 */
export const seedInstagram: InstagramPost[] = [
  {
    id: "ig1",
    imageUrl: "https://simplysourdough.shop/wp-content/uploads/2023/08/sour1.png",
    caption: "Signature country loaves — slow fermented, stone baked",
    permalink: "https://www.instagram.com/simplysourdough2023/reel/DbZnHDtTQPj/",
    featured: true,
  },
  {
    id: "ig2",
    imageUrl: "https://simplysourdough.shop/wp-content/uploads/2023/08/c1.png",
    caption: "Swedish cardamom buns fresh from the oven",
    permalink: "https://www.instagram.com/simplysourdough2023/reel/Da9nfpZTtYw/",
    featured: true,
  },
  {
    id: "ig3",
    imageUrl: "https://simplysourdough.shop/wp-content/uploads/2023/08/pain-au-choc-1.jpg",
    caption: "Pain au chocolat — flaky layers, dark chocolate",
    permalink: "https://www.instagram.com/simplysourdough2023/p/DbKhyymk-N6/",
    featured: true,
  },
  {
    id: "ig4",
    imageUrl: "https://simplysourdough.shop/wp-content/uploads/2023/08/stor_cheesecake-1.jpg",
    caption: "Basque-style cheesecake weekend special",
    permalink: "https://www.instagram.com/simplysourdough2023/p/Da4M73eE4rf/",
    featured: true,
  },
  {
    id: "ig5",
    imageUrl: "https://simplysourdough.shop/wp-content/uploads/2023/08/unnamed-1.png",
    caption: "Danish rye — dense, seedy, wholesome",
    permalink: "https://www.instagram.com/simplysourdough2023/p/DarmBEmE8-M/",
    featured: true,
  },
  {
    id: "ig6",
    imageUrl: "https://simplysourdough.shop/wp-content/uploads/2023/08/spandauer.jpg",
    caption: "Spandauer pastries & Nordic treats",
    permalink: "https://www.instagram.com/simplysourdough2023/p/DaoiwlZkwk_/",
    featured: true,
  },
];

export const seedOrders: Order[] = [
  {
    id: "ord-1001",
    customerName: "Anna Brooks",
    email: "anna@example.com",
    phone: "+61 400 111 222",
    items: [
      { productId: "624", name: "Signature Country Sourdough", quantity: 2, price: 10 },
      { productId: "595", name: "Cardamom Buns (6 pack)", quantity: 1, price: 25 },
    ],
    total: 45,
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    notes: "Pickup Friday morning",
  },
  {
    id: "ord-1002",
    customerName: "Tom Nguyen",
    email: "tom@example.com",
    items: [
      { productId: "622", name: "Danish Rye Sourdough", quantity: 1, price: 12 },
      { productId: "787", name: "Large Cheesecake", quantity: 1, price: 20 },
    ],
    total: 32,
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },
  {
    id: "ord-1003",
    customerName: "Lucy Hart",
    email: "lucy@example.com",
    items: [
      { productId: "784", name: "Cinnamon Buns (6 pack)", quantity: 2, price: 25 },
    ],
    total: 50,
    status: "ready",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];
