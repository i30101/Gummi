import { Product, Category } from "@/types";

const FRIEND_NAMES = [
  "Sophia", "Liam", "Olivia", "Noah", "Emma",
  "Ava", "Mia", "James", "Isabella", "Lucas",
  "Charlotte", "Ethan", "Amelia", "Harper", "Aiden",
];

function randomFriends(): string[] {
  const count = Math.floor(Math.random() * 4);
  const shuffled = [...FRIEND_NAMES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function randomLikes(): number {
  const ranges = [
    [50, 500],
    [500, 5000],
    [5000, 50000],
    [50000, 500000],
  ];
  const range = ranges[Math.floor(Math.random() * ranges.length)];
  return Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
}

function randomShares(): number {
  return Math.floor(Math.random() * 2000) + 10;
}

export const CATEGORIES: Category[] = [
  { id: "for-you", label: "For You", query: "trending aesthetic lifestyle" },
  { id: "fashion", label: "Fashion", query: "fashion clothing accessories streetwear" },
  { id: "home", label: "Home", query: "home decor interior design aesthetic" },
  { id: "beauty", label: "Beauty", query: "beauty skincare cosmetics" },
  { id: "art", label: "Art & Design", query: "art prints design objects" },
  { id: "tech", label: "Tech", query: "tech gadgets accessories minimal" },
  { id: "kitchen", label: "Kitchen", query: "kitchen cookware ceramic styled" },
  { id: "outdoors", label: "Outdoors", query: "outdoor gear adventure travel" },
  { id: "jewelry", label: "Jewelry", query: "jewelry minimal gold silver" },
  { id: "wellness", label: "Wellness", query: "wellness yoga meditation self-care" },
];

export const MOCK_PRODUCTS: Product[] = [
  // ─── FASHION ────────────────────────────────────────
  {
    id: "mock-1",
    title: "Merino Wool Crew Sweater",
    brand: "Everlane",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      alt: "Cozy knit sweater flatlay",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&q=80", alt: "Cozy knit sweater flatlay" },
      { url: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a20?w=1200&q=80", alt: "Person wearing sweater" },
    ],
    price: { min: 9800, max: 9800, currency: "USD" },
    rating: { average: 4.6, count: 342 },
    buyUrl: "https://everlane.com",
    topFeatures: ["100% Merino Wool", "Relaxed Fit", "Machine Washable"],
    description: "The perfect everyday sweater crafted from premium merino wool. Lightweight enough for layering, warm enough to wear on its own. The relaxed fit drapes beautifully without feeling oversized.",
    aspectRatio: 1.25,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-2",
    title: "Oversized Linen Blazer",
    brand: "COS",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
      alt: "Linen blazer on hanger",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80", alt: "Linen blazer on hanger" },
    ],
    price: { min: 17500, max: 17500, currency: "USD" },
    rating: { average: 4.8, count: 89 },
    buyUrl: "https://cos.com",
    topFeatures: ["100% Linen", "Oversized Cut", "Unlined"],
    description: "An effortlessly chic oversized blazer in pure linen. The dropped shoulders and relaxed silhouette make it perfect for throwing over anything from a t-shirt to a silk camisole.",
    aspectRatio: 1.5,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-3",
    title: "Vintage Wash Straight Jeans",
    brand: "AGOLDE",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
      alt: "Vintage wash jeans",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80", alt: "Vintage wash jeans" },
    ],
    price: { min: 19800, max: 19800, currency: "USD" },
    rating: { average: 4.7, count: 256 },
    buyUrl: "https://agolde.com",
    topFeatures: ["Organic Cotton", "Mid Rise", "Relaxed Straight"],
    description: "The jean that goes with everything. This relaxed straight-leg style features a perfectly worn-in vintage wash and organic cotton denim that softens beautifully over time.",
    aspectRatio: 1.4,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-4",
    title: "Cashmere Beanie",
    brand: "Naadam",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80",
      alt: "Cashmere beanie styled",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=1200&q=80", alt: "Cashmere beanie" },
    ],
    price: { min: 7500, max: 7500, currency: "USD" },
    rating: { average: 4.9, count: 512 },
    buyUrl: "https://naadam.co",
    topFeatures: ["Grade-A Cashmere", "Ribbed Knit", "One Size"],
    description: "Impossibly soft Grade-A Mongolian cashmere in a classic ribbed knit beanie. The kind of everyday luxury that makes winter bearable.",
    aspectRatio: 1.0,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-5",
    title: "Italian Leather Chelsea Boots",
    brand: "Madewell",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80",
      alt: "Chelsea boots on wooden floor",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=1200&q=80", alt: "Chelsea boots" },
    ],
    price: { min: 22800, max: 22800, currency: "USD" },
    rating: { average: 4.5, count: 178 },
    buyUrl: "https://madewell.com",
    topFeatures: ["Italian Leather", "Lug Sole", "Pull Tab"],
    description: "A modern take on the classic Chelsea boot with a chunky lug sole and pull-tab detail. Handcrafted from buttery Italian leather that develops a gorgeous patina with wear.",
    aspectRatio: 1.15,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── HOME & INTERIORS ──────────────────────────────
  {
    id: "mock-6",
    title: "Hand-Thrown Ceramic Vase",
    brand: "East Fork",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&q=80",
      alt: "Ceramic vase with dried flowers",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1200&q=80", alt: "Ceramic vase" },
      { url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1200&q=80", alt: "Vase detail" },
    ],
    price: { min: 11000, max: 11000, currency: "USD" },
    rating: { average: 4.9, count: 203 },
    buyUrl: "https://eastfork.com",
    topFeatures: ["Hand-thrown", "Lead-free Glaze", "Made in Asheville"],
    description: "Each vase is individually hand-thrown on the wheel and dipped in our signature glaze. No two are exactly alike, making this a one-of-a-kind addition to your home.",
    aspectRatio: 1.35,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-7",
    title: "Boucle Accent Chair",
    brand: "Article",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
      alt: "Modern accent chair in living room",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80", alt: "Accent chair" },
    ],
    price: { min: 59900, max: 59900, currency: "USD" },
    rating: { average: 4.7, count: 145 },
    buyUrl: "https://article.com",
    topFeatures: ["Boucle Fabric", "Solid Oak Legs", "360° Swivel"],
    description: "Sink into the cloud-like comfort of this boucle accent chair. The 360-degree swivel and solid oak legs make it as functional as it is beautiful. A statement piece for any room.",
    aspectRatio: 1.1,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-8",
    title: "Soy Wax Candle — Fig & Vetiver",
    brand: "P.F. Candle Co.",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1602607616907-fac24b10e3b1?w=600&q=80",
      alt: "Artisan candle on marble surface",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1602607616907-fac24b10e3b1?w=1200&q=80", alt: "Candle" },
    ],
    price: { min: 3600, max: 3600, currency: "USD" },
    rating: { average: 4.8, count: 891 },
    buyUrl: "https://pfcandleco.com",
    topFeatures: ["100% Soy Wax", "Cotton Wick", "45hr Burn Time"],
    description: "A warm, grounding blend of ripe fig, dark vetiver, and black currant. Hand-poured in Los Angeles using domestically grown soy wax and fine fragrance oils.",
    aspectRatio: 1.0,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-9",
    title: "Linen Duvet Cover Set",
    brand: "Brooklinen",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1631049035634-c1eed1a5a808?w=600&q=80",
      alt: "Linen bedding in airy bedroom",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1631049035634-c1eed1a5a808?w=1200&q=80", alt: "Linen bedding" },
    ],
    price: { min: 24900, max: 34900, currency: "USD" },
    rating: { average: 4.6, count: 432 },
    buyUrl: "https://brooklinen.com",
    topFeatures: ["European Flax Linen", "Pre-washed", "OEKO-TEX Certified"],
    description: "Effortlessly rumpled, perfectly breathable European flax linen. Pre-washed for immediate softness — no stiff break-in period. Gets softer with every wash.",
    aspectRatio: 0.75,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-10",
    title: "Terrazzo Side Table",
    brand: "CB2",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      alt: "Modern side table styled",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80", alt: "Side table" },
    ],
    price: { min: 29900, max: 29900, currency: "USD" },
    rating: { average: 4.4, count: 67 },
    buyUrl: "https://cb2.com",
    topFeatures: ["Terrazzo Top", "Brass Base", "Handmade"],
    description: "A striking terrazzo top sits on a slender brass pedestal. Each top features a unique pattern of marble chips suspended in white concrete. A modern heirloom.",
    aspectRatio: 1.2,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── BEAUTY & SKINCARE ─────────────────────────────
  {
    id: "mock-11",
    title: "Vitamin C Brightening Serum",
    brand: "Drunk Elephant",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
      alt: "Skincare serum bottle",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80", alt: "Serum" },
    ],
    price: { min: 7800, max: 7800, currency: "USD" },
    rating: { average: 4.5, count: 1234 },
    buyUrl: "https://drunkelephant.com",
    topFeatures: ["15% Vitamin C", "Ferulic Acid", "Vegan"],
    description: "A potent 15% L-ascorbic acid serum that brightens, firms, and improves the appearance of fine lines overnight. Clean formulation without essential oils, silicones, or fragrance.",
    aspectRatio: 1.45,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-12",
    title: "Rose Quartz Gua Sha",
    brand: "Herbivore",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
      alt: "Rose quartz gua sha tool",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=80", alt: "Gua sha" },
    ],
    price: { min: 1800, max: 1800, currency: "USD" },
    rating: { average: 4.7, count: 678 },
    buyUrl: "https://herbivorebotanicals.com",
    topFeatures: ["Genuine Rose Quartz", "Sculpting Edge", "Comes with Pouch"],
    description: "A traditional facial sculpting tool carved from genuine rose quartz. Promotes circulation, reduces puffiness, and gives your skincare routine a spa-like ritual.",
    aspectRatio: 1.0,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-13",
    title: "Lip & Cheek Tint — Petal",
    brand: "Glossier",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80",
      alt: "Cosmetics flatlay with lip tint",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1200&q=80", alt: "Lip tint" },
    ],
    price: { min: 1700, max: 1700, currency: "USD" },
    rating: { average: 4.3, count: 2341 },
    buyUrl: "https://glossier.com",
    topFeatures: ["Buildable Color", "Dewy Finish", "Dual Use"],
    description: "A sheer, buildable gel-cream color for lips and cheeks. Just dab and blend for a natural flush that looks like you just came back from a run — but chic.",
    aspectRatio: 1.3,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── ART & DESIGN ─────────────────────────────────
  {
    id: "mock-14",
    title: "Abstract Line Art Print",
    brand: "The Poster Club",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
      alt: "Abstract art print on wall",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80", alt: "Art print" },
    ],
    price: { min: 4500, max: 8500, currency: "USD" },
    rating: { average: 4.8, count: 156 },
    buyUrl: "https://theposterclub.com",
    topFeatures: ["Giclée Print", "Acid-Free Paper", "Signed by Artist"],
    description: "A striking one-line abstract composition printed on museum-quality acid-free paper. Each print is signed and numbered by the artist. Available in multiple sizes.",
    aspectRatio: 1.4,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-15",
    title: "Bauhaus Exhibition Poster",
    brand: "Desenio",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80",
      alt: "Bauhaus poster framed on wall",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200&q=80", alt: "Poster" },
    ],
    price: { min: 2900, max: 5900, currency: "USD" },
    rating: { average: 4.6, count: 289 },
    buyUrl: "https://desenio.com",
    topFeatures: ["Museum Quality", "Multiple Sizes", "Unframed"],
    description: "A faithful reproduction of a classic Bauhaus exhibition poster. Bold geometric forms and primary colors that transform any wall into a gallery.",
    aspectRatio: 1.55,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── TECH & GADGETS ────────────────────────────────
  {
    id: "mock-16",
    title: "Portable Bluetooth Speaker",
    brand: "Bang & Olufsen",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
      alt: "Minimal bluetooth speaker on desk",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&q=80", alt: "Speaker" },
    ],
    price: { min: 24900, max: 24900, currency: "USD" },
    rating: { average: 4.7, count: 456 },
    buyUrl: "https://bang-olufsen.com",
    topFeatures: ["360° Sound", "12hr Battery", "USB-C"],
    description: "Iconic Scandinavian design meets audiophile-grade sound. True 360-degree audio fills any room, while the aluminum body is built to travel with you anywhere.",
    aspectRatio: 1.0,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-17",
    title: "Mechanical Keyboard — Sage",
    brand: "Keychron",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80",
      alt: "Mechanical keyboard on desk setup",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1200&q=80", alt: "Keyboard" },
    ],
    price: { min: 8900, max: 8900, currency: "USD" },
    rating: { average: 4.8, count: 1024 },
    buyUrl: "https://keychron.com",
    topFeatures: ["Gateron Switches", "Hot-swappable", "Wireless"],
    description: "A compact 75% mechanical keyboard in a gorgeous sage green colorway. Hot-swappable switches let you customize the typing feel, and Bluetooth 5.1 keeps your desk clean.",
    aspectRatio: 0.7,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── KITCHEN & FOOD ────────────────────────────────
  {
    id: "mock-18",
    title: "Pour-Over Coffee Dripper",
    brand: "Fellow",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
      alt: "Pour over coffee setup",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80", alt: "Coffee dripper" },
    ],
    price: { min: 3500, max: 3500, currency: "USD" },
    rating: { average: 4.9, count: 789 },
    buyUrl: "https://fellowproducts.com",
    topFeatures: ["Double-wall Ceramic", "Ratio Aid", "BPA-Free"],
    description: "The perfect cup of pour-over coffee, every single morning. The double-wall ceramic body keeps water at optimal temperature, while the ratio aid helps you nail the water-to-coffee ratio.",
    aspectRatio: 1.15,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-19",
    title: "Japanese Chef's Knife 8\"",
    brand: "Miyabi",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80",
      alt: "Japanese chef knife on cutting board",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=1200&q=80", alt: "Chef knife" },
    ],
    price: { min: 14900, max: 14900, currency: "USD" },
    rating: { average: 4.8, count: 367 },
    buyUrl: "https://miyabi.com",
    topFeatures: ["SG2 Steel", "Birchwood Handle", "Ice Hardened"],
    description: "Forged in Seki, Japan from SG2 micro-carbide powder steel. The 8-inch blade holds its edge longer than any Western knife, and the birchwood handle is a work of art in itself.",
    aspectRatio: 0.65,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── JEWELRY ───────────────────────────────────────
  {
    id: "mock-20",
    title: "Gold Vermeil Signet Ring",
    brand: "Mejuri",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      alt: "Gold signet ring on hand",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80", alt: "Ring" },
    ],
    price: { min: 9800, max: 9800, currency: "USD" },
    rating: { average: 4.6, count: 543 },
    buyUrl: "https://mejuri.com",
    topFeatures: ["18K Gold Vermeil", "Recycled Silver", "Hypoallergenic"],
    description: "A modern signet ring in 18K gold vermeil over recycled sterling silver. The slightly oversized face catches the light beautifully — understated luxury for everyday wear.",
    aspectRatio: 1.0,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── OUTDOORS ──────────────────────────────────────
  {
    id: "mock-21",
    title: "Insulated Water Bottle 32oz",
    brand: "Hydro Flask",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
      alt: "Water bottle in nature",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80", alt: "Water bottle" },
    ],
    price: { min: 4495, max: 4495, currency: "USD" },
    rating: { average: 4.7, count: 3456 },
    buyUrl: "https://hydroflask.com",
    topFeatures: ["TempShield Insulation", "18/8 Stainless", "24hr Cold"],
    description: "Keeps drinks ice-cold for 24 hours or hot for 12. The powder-coated finish won't slip from your hands, and the wide mouth makes it easy to add ice cubes.",
    aspectRatio: 1.5,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-22",
    title: "Recycled Fleece Half-Zip",
    brand: "Patagonia",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
      alt: "Person wearing fleece in mountains",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80", alt: "Fleece" },
    ],
    price: { min: 13900, max: 13900, currency: "USD" },
    rating: { average: 4.8, count: 987 },
    buyUrl: "https://patagonia.com",
    topFeatures: ["100% Recycled Polyester", "Fair Trade", "Midweight"],
    description: "Made from 100% recycled polyester fleece, this midweight half-zip is the perfect layering piece. Fair Trade Certified sewn for people you can't see but should care about.",
    aspectRatio: 1.25,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── WELLNESS ──────────────────────────────────────
  {
    id: "mock-23",
    title: "Cork Yoga Mat",
    brand: "Manduka",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
      alt: "Yoga mat in serene setting",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80", alt: "Yoga mat" },
    ],
    price: { min: 11000, max: 11000, currency: "USD" },
    rating: { average: 4.6, count: 234 },
    buyUrl: "https://manduka.com",
    topFeatures: ["Natural Cork", "Non-slip", "Antimicrobial"],
    description: "A sustainable cork surface that actually gets grippier when you sweat. The natural antimicrobial properties of cork mean it stays fresh without chemical treatments.",
    aspectRatio: 0.8,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-24",
    title: "Ceramic Essential Oil Diffuser",
    brand: "Vitruvi",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80",
      alt: "Essential oil diffuser on nightstand",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=1200&q=80", alt: "Diffuser" },
    ],
    price: { min: 11900, max: 11900, currency: "USD" },
    rating: { average: 4.5, count: 678 },
    buyUrl: "https://vitruvi.com",
    topFeatures: ["Porcelain Shell", "Ultrasonic", "8hr Runtime"],
    description: "A beautiful matte porcelain diffuser that looks more like a piece of pottery than a wellness gadget. Ultrasonic technology disperses a fine, cool mist throughout your space.",
    aspectRatio: 1.2,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── MORE FASHION ──────────────────────────────────
  {
    id: "mock-25",
    title: "Canvas Tote Bag",
    brand: "Baggu",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
      alt: "Canvas tote with everyday items",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80", alt: "Tote bag" },
    ],
    price: { min: 3400, max: 3400, currency: "USD" },
    rating: { average: 4.7, count: 2134 },
    buyUrl: "https://baggu.com",
    topFeatures: ["Heavyweight Canvas", "Interior Pocket", "Holds 50lbs"],
    description: "The everyday tote that replaces all your plastic bags. Heavyweight recycled cotton canvas with a snap closure and interior slip pocket. Holds way more than it looks like it should.",
    aspectRatio: 1.1,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-26",
    title: "Silk Scrunchie Set",
    brand: "Slip",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
      alt: "Silk scrunchies in pastel colors",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80", alt: "Scrunchies" },
    ],
    price: { min: 3900, max: 3900, currency: "USD" },
    rating: { average: 4.4, count: 567 },
    buyUrl: "https://slip.com",
    topFeatures: ["Mulberry Silk", "Set of 3", "Anti-crease"],
    description: "Pure mulberry silk scrunchies that won't leave creases, pull, or snag your hair. These are the ones that converted your friend who said she'd never wear a scrunchie.",
    aspectRatio: 1.0,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── MORE HOME ─────────────────────────────────────
  {
    id: "mock-27",
    title: "Marble & Brass Bookends",
    brand: "West Elm",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      alt: "Marble bookends on shelf",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80", alt: "Bookends" },
    ],
    price: { min: 6900, max: 6900, currency: "USD" },
    rating: { average: 4.5, count: 123 },
    buyUrl: "https://westelm.com",
    topFeatures: ["Solid Marble", "Brass Accents", "Set of 2"],
    description: "Solid marble bookends with hand-applied brass leaf detail. Heavy enough to hold a full shelf of cookbooks. Each piece is unique due to natural marble veining.",
    aspectRatio: 1.3,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-28",
    title: "Hand-Woven Throw Blanket",
    brand: "The Citizenry",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
      alt: "Throw blanket draped on sofa",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80", alt: "Throw blanket" },
    ],
    price: { min: 14500, max: 14500, currency: "USD" },
    rating: { average: 4.9, count: 89 },
    buyUrl: "https://the-citizenry.com",
    topFeatures: ["Baby Alpaca", "Hand-woven", "Artisan Made"],
    description: "Hand-woven by master artisans in the Peruvian highlands from impossibly soft baby alpaca fiber. Each blanket takes several days to complete on a traditional pedal loom.",
    aspectRatio: 0.85,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── MORE KITCHEN ──────────────────────────────────
  {
    id: "mock-29",
    title: "Ceramic Dinnerware Set",
    brand: "Our Place",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80",
      alt: "Ceramic plates stacked artfully",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&q=80", alt: "Dinnerware" },
    ],
    price: { min: 9500, max: 17000, currency: "USD" },
    rating: { average: 4.6, count: 345 },
    buyUrl: "https://fromourplace.com",
    topFeatures: ["Stackable Design", "Dishwasher Safe", "Lead-free"],
    description: "Beautifully designed ceramic plates, bowls, and mugs that stack neatly to save cabinet space. The matte glaze in earth tones makes every meal look Instagram-worthy.",
    aspectRatio: 0.9,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-30",
    title: "Cast Iron Dutch Oven",
    brand: "Le Creuset",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
      alt: "Colorful Dutch oven on stove",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&q=80", alt: "Dutch oven" },
    ],
    price: { min: 37500, max: 37500, currency: "USD" },
    rating: { average: 4.9, count: 2567 },
    buyUrl: "https://lecreuset.com",
    topFeatures: ["Enameled Cast Iron", "5.5 Qt", "Lifetime Warranty"],
    description: "The legendary Dutch oven that belongs in every kitchen. Enameled cast iron distributes heat evenly and beautifully, from stovetop to oven to table. Comes with a lifetime warranty because it will outlive you.",
    aspectRatio: 1.05,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── MORE ART ──────────────────────────────────────
  {
    id: "mock-31",
    title: "Botanical Illustration Print",
    brand: "Juniper Print Shop",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1578301978693-85fa9fd0c4d2?w=600&q=80",
      alt: "Botanical print in wooden frame",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1578301978693-85fa9fd0c4d2?w=1200&q=80", alt: "Botanical print" },
    ],
    price: { min: 2800, max: 7200, currency: "USD" },
    rating: { average: 4.7, count: 198 },
    buyUrl: "https://juniperprintshop.com",
    topFeatures: ["Archival Paper", "Vibrant Inks", "Multiple Sizes"],
    description: "A delicate botanical illustration printed on archival-quality matte paper with vibrant, fade-resistant inks. Brings a touch of nature indoors all year round.",
    aspectRatio: 1.4,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── ACCESSORIES ───────────────────────────────────
  {
    id: "mock-32",
    title: "Leather Card Wallet",
    brand: "Bellroy",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
      alt: "Slim leather wallet",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80", alt: "Wallet" },
    ],
    price: { min: 8900, max: 8900, currency: "USD" },
    rating: { average: 4.8, count: 1543 },
    buyUrl: "https://bellroy.com",
    topFeatures: ["Premium Leather", "RFID Protected", "Holds 4-12 Cards"],
    description: "The slimmest wallet you'll ever own. Premium vegetable-tanned leather with RFID protection. A pull tab reveals hidden cards when you need them. Your back pocket will thank you.",
    aspectRatio: 0.75,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-33",
    title: "Polarized Sunglasses — Sage",
    brand: "Raen",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
      alt: "Sunglasses in sunlight",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80", alt: "Sunglasses" },
    ],
    price: { min: 13500, max: 13500, currency: "USD" },
    rating: { average: 4.6, count: 432 },
    buyUrl: "https://raen.com",
    topFeatures: ["Carl Zeiss Lenses", "Plant-based Acetate", "Polarized"],
    description: "Hand-finished plant-based acetate frames with Carl Zeiss polarized lenses. The kind of sunglasses that make people ask 'where did you get those?' every time you wear them.",
    aspectRatio: 0.7,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── MORE BEAUTY ───────────────────────────────────
  {
    id: "mock-34",
    title: "Natural Deodorant — Eucalyptus",
    brand: "Each & Every",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
      alt: "Natural deodorant on bathroom shelf",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80", alt: "Deodorant" },
    ],
    price: { min: 1500, max: 1500, currency: "USD" },
    rating: { average: 4.3, count: 876 },
    buyUrl: "https://eachandevery.com",
    topFeatures: ["Aluminum-free", "EWG Verified", "Sensitive Skin Safe"],
    description: "Clean, effective deodorant made with only ingredients you can pronounce. EWG Verified and safe enough for freshly shaved skin. The eucalyptus scent is a spa moment in every swipe.",
    aspectRatio: 1.35,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── STATIONERY ────────────────────────────────────
  {
    id: "mock-35",
    title: "Linen Notebook — A5",
    brand: "Appointed",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80",
      alt: "Linen notebook on desk",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=1200&q=80", alt: "Notebook" },
    ],
    price: { min: 2800, max: 2800, currency: "USD" },
    rating: { average: 4.8, count: 567 },
    buyUrl: "https://appointed.com",
    topFeatures: ["Linen Cover", "Lay-flat Binding", "Made in USA"],
    description: "A beautifully bound notebook with a textured linen cover and gilt page edges. The lay-flat binding means no more hand cramps from holding pages open. Made in Washington D.C.",
    aspectRatio: 1.25,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── PLANTS ────────────────────────────────────────
  {
    id: "mock-36",
    title: "Trailing Pothos in Ceramic Pot",
    brand: "The Sill",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
      alt: "Trailing plant on shelf",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80", alt: "Pothos" },
    ],
    price: { min: 5200, max: 5200, currency: "USD" },
    rating: { average: 4.5, count: 678 },
    buyUrl: "https://thesill.com",
    topFeatures: ["Low Maintenance", "Air Purifying", "Includes Pot"],
    description: "The most forgiving houseplant you'll ever own. This trailing pothos thrives in low light and only needs water when the soil is dry. Comes in a minimalist ceramic planter.",
    aspectRatio: 1.3,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── FRAGRANCE ─────────────────────────────────────
  {
    id: "mock-37",
    title: "Eau de Parfum — Santal 33",
    brand: "Le Labo",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
      alt: "Perfume bottle minimalist",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80", alt: "Perfume" },
    ],
    price: { min: 19700, max: 31000, currency: "USD" },
    rating: { average: 4.7, count: 1890 },
    buyUrl: "https://lelabofragrances.com",
    topFeatures: ["Unisex", "Hand-blended", "Vegan"],
    description: "The cult fragrance that smells like a campfire in the best way possible. Sandalwood, cardamom, iris, and violet come together in a scent that's become a modern classic. Hand-blended to order.",
    aspectRatio: 1.45,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── LIGHTING ──────────────────────────────────────
  {
    id: "mock-38",
    title: "Mushroom Table Lamp",
    brand: "Gubi",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80",
      alt: "Designer lamp on side table",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80", alt: "Lamp" },
    ],
    price: { min: 44900, max: 44900, currency: "USD" },
    rating: { average: 4.8, count: 76 },
    buyUrl: "https://gubi.com",
    topFeatures: ["Mouth-blown Glass", "Dimmable", "Mid-century Design"],
    description: "An icon of mid-century Italian design, this mushroom lamp features a mouth-blown glass shade that casts a warm, diffused glow. Dimmable for the perfect mood in any room.",
    aspectRatio: 1.15,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── BAGS ──────────────────────────────────────────
  {
    id: "mock-39",
    title: "Leather Crossbody Bag",
    brand: "Mansur Gavriel",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      alt: "Leather crossbody bag styled",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80", alt: "Crossbody bag" },
    ],
    price: { min: 39500, max: 39500, currency: "USD" },
    rating: { average: 4.7, count: 234 },
    buyUrl: "https://mansurgavriel.com",
    topFeatures: ["Italian Leather", "Adjustable Strap", "Interior Pocket"],
    description: "Vegetable-tanned Italian leather in a clean, architectural silhouette. The adjustable strap lets you wear it crossbody or on the shoulder. A bag that goes from coffee shop to dinner.",
    aspectRatio: 1.2,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── WATCHES ───────────────────────────────────────
  {
    id: "mock-40",
    title: "Minimalist Watch — Mesh Band",
    brand: "Skagen",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
      alt: "Minimal watch on wrist",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80", alt: "Watch" },
    ],
    price: { min: 16500, max: 16500, currency: "USD" },
    rating: { average: 4.5, count: 890 },
    buyUrl: "https://skagen.com",
    topFeatures: ["Japanese Movement", "Stainless Steel", "Water Resistant"],
    description: "Danish design at its finest — a razor-thin case on a smooth mesh band. The sunray dial catches light differently throughout the day. Sometimes the most minimal thing makes the biggest statement.",
    aspectRatio: 1.0,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  // ─── FILL OUT TO 48 ITEMS ──────────────────────────
  {
    id: "mock-41",
    title: "Organic Cotton Hoodie",
    brand: "Kotn",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
      alt: "Person in oversized hoodie",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80", alt: "Hoodie" },
    ],
    price: { min: 8500, max: 8500, currency: "USD" },
    rating: { average: 4.6, count: 432 },
    buyUrl: "https://kotn.com",
    topFeatures: ["Egyptian Cotton", "Midweight Fleece", "Relaxed Fit"],
    description: "Premium Egyptian cotton terry in an effortless oversized silhouette. Heavy enough to feel substantial, soft enough to sleep in. The only hoodie you'll reach for.",
    aspectRatio: 1.35,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-42",
    title: "Stoneware Mug Set",
    brand: "Hasami Porcelain",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
      alt: "Ceramic mugs on wooden tray",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1200&q=80", alt: "Mugs" },
    ],
    price: { min: 5600, max: 5600, currency: "USD" },
    rating: { average: 4.9, count: 234 },
    buyUrl: "https://hasami-porcelain.com",
    topFeatures: ["Stackable", "Modular System", "Made in Japan"],
    description: "Part of Hasami's iconic modular system — each piece stacks perfectly with any other. Made in Hasami, Japan, a region with 400 years of porcelain-making tradition.",
    aspectRatio: 1.0,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-43",
    title: "Silk Sleep Mask",
    brand: "Slip",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&q=80",
      alt: "Silk sleep mask on pillow",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=1200&q=80", alt: "Sleep mask" },
    ],
    price: { min: 5000, max: 5000, currency: "USD" },
    rating: { average: 4.7, count: 1234 },
    buyUrl: "https://slip.com",
    topFeatures: ["Mulberry Silk", "Adjustable Strap", "Anti-aging"],
    description: "Pure mulberry silk that's gentle on your skin and won't crease your face while you sleep. The adjustable elastic strap ensures a perfect fit without pulling your hair.",
    aspectRatio: 0.8,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-44",
    title: "Brass Desk Organizer",
    brand: "Tom Dixon",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      alt: "Brass organizer on minimal desk",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80", alt: "Desk organizer" },
    ],
    price: { min: 12500, max: 12500, currency: "USD" },
    rating: { average: 4.4, count: 89 },
    buyUrl: "https://tomdixon.net",
    topFeatures: ["Solid Brass", "Modular", "Develops Patina"],
    description: "Solid brass hexagonal vessels that interlock to create your own desk organization system. The unlacquered brass will develop a beautiful patina over time — or polish it to keep the shine.",
    aspectRatio: 1.1,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-45",
    title: "Wool Running Shoes",
    brand: "Allbirds",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
      alt: "Minimal wool sneakers",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80", alt: "Sneakers" },
    ],
    price: { min: 11000, max: 11000, currency: "USD" },
    rating: { average: 4.5, count: 4567 },
    buyUrl: "https://allbirds.com",
    topFeatures: ["ZQ Merino Wool", "Carbon Neutral", "Machine Washable"],
    description: "The shoe that launched a movement. ZQ-certified merino wool naturally regulates temperature and wicks moisture. Machine washable for when life gets messy. Carbon neutral certified.",
    aspectRatio: 0.75,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-46",
    title: "Incense — Hinoki",
    brand: "Hibi",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=600&q=80",
      alt: "Incense burning in holder",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=1200&q=80", alt: "Incense" },
    ],
    price: { min: 1600, max: 1600, currency: "USD" },
    rating: { average: 4.6, count: 345 },
    buyUrl: "https://hibi-jp.com",
    topFeatures: ["Made in Japan", "Self-lighting", "10min Burn"],
    description: "Strike like a match, no lighter needed. These self-lighting incense sticks from Japan burn for exactly 10 minutes — just enough to reset your mood. The hinoki scent is pure forest bathing.",
    aspectRatio: 1.5,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-47",
    title: "Linen Apron — Oat",
    brand: "Hedley & Bennett",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      alt: "Person wearing linen apron in kitchen",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80", alt: "Apron" },
    ],
    price: { min: 6500, max: 6500, currency: "USD" },
    rating: { average: 4.7, count: 456 },
    buyUrl: "https://hedleyandbennett.com",
    topFeatures: ["Japanese Linen", "Adjustable Neck", "Deep Pockets"],
    description: "A professional-grade apron in beautiful Japanese linen. The crossback design distributes weight evenly so your neck never hurts. Deep pockets hold your phone, thermometer, and tasting spoons.",
    aspectRatio: 1.4,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
  {
    id: "mock-48",
    title: "Portable Espresso Maker",
    brand: "Wacaco",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
      alt: "Portable espresso being made outdoors",
    },
    images: [
      { url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80", alt: "Espresso maker" },
    ],
    price: { min: 8900, max: 8900, currency: "USD" },
    rating: { average: 4.4, count: 678 },
    buyUrl: "https://wacaco.com",
    topFeatures: ["No Battery", "18 Bar Pressure", "Compact"],
    description: "Real espresso anywhere — no electricity or batteries needed. Hand-powered 18-bar pressure produces a shot with genuine crema. Pack it for camping, travel, or just your desk at work.",
    aspectRatio: 1.2,
    likes: randomLikes(),
    shares: randomShares(),
    likedByFriends: randomFriends(),
  },
];

// Paginate mock data
export function getMockProducts(
  cursor: string | null,
  limit: number = 15,
  category?: string
): { products: Product[]; nextCursor: string | null; hasMore: boolean } {
  let products = MOCK_PRODUCTS;

  // Simulate category filtering by shuffling with a seed based on category
  if (category && category !== "for-you") {
    const seed = category.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    products = [...products].sort((a, b) => {
      const hashA = (a.id.charCodeAt(a.id.length - 1) * seed) % 100;
      const hashB = (b.id.charCodeAt(b.id.length - 1) * seed) % 100;
      return hashA - hashB;
    });
  }

  const startIndex = cursor ? parseInt(cursor, 10) : 0;
  const endIndex = startIndex + limit;
  const slice = products.slice(startIndex, endIndex);

  // If we've gone through all products, loop back with modified IDs
  if (slice.length < limit && startIndex < products.length * 3) {
    const remaining = limit - slice.length;
    const looped = products.slice(0, remaining).map((p, i) => ({
      ...p,
      id: `${p.id}-loop-${startIndex}-${i}`,
      likes: randomLikes(),
      shares: randomShares(),
      likedByFriends: randomFriends(),
    }));
    const allProducts = [...slice, ...looped];
    return {
      products: allProducts,
      nextCursor: String(endIndex),
      hasMore: true,
    };
  }

  return {
    products: slice,
    nextCursor: slice.length === limit ? String(endIndex) : null,
    hasMore: slice.length === limit,
  };
}

// Search mock data
export function searchMockProducts(
  query: string,
  cursor: string | null,
  limit: number = 15
): { products: Product[]; nextCursor: string | null; hasMore: boolean } {
  const q = query.toLowerCase();
  const filtered = MOCK_PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.topFeatures.some((f) => f.toLowerCase().includes(q))
  );

  if (filtered.length === 0) {
    return { products: [], nextCursor: null, hasMore: false };
  }

  const startIndex = cursor ? parseInt(cursor, 10) : 0;
  const slice = filtered.slice(startIndex, startIndex + limit);

  return {
    products: slice,
    nextCursor: slice.length === limit ? String(startIndex + limit) : null,
    hasMore: slice.length === limit,
  };
}
