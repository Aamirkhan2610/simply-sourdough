import catalog from "./products.json";
import type {
  InstagramPost,
  Order,
  Product,
  Review,
  SiteSettings,
} from "@/lib/types";

export const siteSettings: SiteSettings = {
  businessName: "Simply Sourdough",
  tagline: "Artisan sourdough and Swedish buns, baked fresh in Lismore",
  email: "farid@simplysourdough.shop",
  phone: "+61 478 481 989",
  whatsapp: "+61478481989",
  address: "Embassy Arcade, 3/97 Keen St",
  city: "Lismore NSW 2480, Australia",
  hours: "Tue–Fri 8:00 AM–5:00 PM · Sat 7:00 AM–2:00 PM · or until sold out",
  instagramUrl: "https://www.instagram.com/simplysourdough2023/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61551937266868&mibextid=LQQJ4d",
  googleReviewsUrl: "https://share.google/n2bqUz1UaKPGnJzbU",
  aboutStory:
    "Farid’s passion for sourdough ignited in his childhood, watching his mother create magic in the kitchen. Over 14 years he honed his craft as a baker in Denmark and Sweden. Four years ago he moved to Lismore and founded Simply Sourdough — a micro-bakery celebrating traditional Nordic recipes with only fresh, natural ingredients and slow fermentation.",
};

const now = new Date().toISOString();

export const seedProducts: Product[] = catalog as Product[];

/** Google reviews Shaymah chose to show beside the 5.0 average. */
export const seedReviews: Review[] = [
  {
    id: "r-mandy",
    author: "Mandy Thomas",
    rating: 5,
    text: "My Granny Svea was Swedish, arriving at her country gate as a child, was to be filled with the aroma of fruit buns in the oven, that had been loving prepared in the very early hours of the morning .. just for us. This little shop has that same heart in is beautiful breads and delivered with such warm friendly service. Every morsel .. pure magic.",
    date: "2026-07-29",
    source: "google",
    featured: true,
    avatarInitials: "MT",
  },
  {
    id: "r-ian",
    author: "Ian Cooper",
    rating: 5,
    text: "This bakery is absolutely amazing! Sourdough unlike any other, their products are so delicious, to die for!! The baker and his staff are such lovely people, don't pass this one if in the area, absolute 10 out of 10 xxx thank you Simply Sourdough.",
    date: "2026-02-28",
    source: "google",
    featured: true,
    avatarInitials: "IC",
  },
  {
    id: "r-grace",
    author: "Grace Cameron",
    rating: 5,
    text: "Really flavourful bread and pastry. All three things we've tried so far have been special (cinnamon bun, cardamom and custard doughnut and rye and pumpkin seed sourdough bread). A little hole in the wall in a little alley. I'm so glad we followed our nose when we smelled that delicious smell walking past.",
    date: "2025-09-29",
    source: "google",
    featured: true,
    avatarInitials: "GC",
  },
  {
    id: "r-violet",
    author: "Violet Renner-Davis",
    rating: 5,
    text: "wow! just wow! we too smelt the cinnamon rolls from the footpath and was drawn down the alleyway to this cute little shop. we were served a cinnamon scroll right from the oven and it was so tasty and warm! i definitely recommend!",
    date: "2026-08-29",
    source: "google",
    featured: true,
    avatarInitials: "VR",
  },
  {
    id: "r-gem",
    author: "Gem Star",
    rating: 5,
    text: "OMG the cinnamon scroll with a hint of cardamom was divine! I followed the scent of fresh bread into the arcade, and was lucky enough to get freshly baked warm cinnamon scroll. Soft bun, perfectly sweet, spiced and warm.. Soo good.",
    date: "2026-08-29",
    source: "google",
    featured: true,
    avatarInitials: "GS",
  },
  {
    id: "r-dani",
    author: "Dani T",
    rating: 5,
    text: "I was only walking past when the familiar sent caught me off guard the aroma of the cinnamon rolls from my childhood my grandmother would make who comes from Finland, I can say these cinnamon rolls are some of the best and give any Nordic grandma a run for their money! I can't wait for my next trip back :)",
    date: "2026-07-29",
    source: "google",
    featured: true,
    avatarInitials: "DT",
  },
  {
    id: "r-gustaf",
    author: "Gustaf Brithén",
    rating: 5,
    text: "A tiny little bakery you'll only find if you smell your way there. High quality and organic. Traditional handmade Scandinavian products.",
    date: "2025-09-29",
    source: "google",
    featured: true,
    avatarInitials: "GB",
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
