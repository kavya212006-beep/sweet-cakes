export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  priceCents: number;
  compareAtCents?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  bestseller?: boolean;
  availability: string;
  deliveryText: string;
  primaryImage: string;
  gallery: string[];
  flavors: string[];
  sizes: string[];
  weightOptions: string[];
  tags: string[];
};

export const brand = {
  name: "Sweet Delights",
  tagline: "Luxury cakes, bespoke celebration dessert artistry, and same-day indulgence.",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  email: "hello@sweetdelights.co",
  address: "28 Rosewood Avenue, Bandra West, Mumbai, India",
  mapUrl: "https://maps.google.com/?q=Bandra%20West%20Mumbai",
  instagram: "@sweetdelights",
};

export const categories = [
  { name: "Birthday Cakes", slug: "birthday-cakes", accent: "Rose", icon: "🎂" },
  { name: "Wedding Cakes", slug: "wedding-cakes", accent: "Pearl", icon: "💍" },
  { name: "Anniversary Cakes", slug: "anniversary-cakes", accent: "Champagne", icon: "✨" },
  { name: "Designer Cakes", slug: "designer-cakes", accent: "Couture", icon: "🎨" },
  { name: "Chocolate Cakes", slug: "chocolate-cakes", accent: "Cacao", icon: "🍫" },
  { name: "Fruit Cakes", slug: "fruit-cakes", accent: "Garden", icon: "🍓" },
  { name: "Kids Cakes", slug: "kids-cakes", accent: "Playful", icon: "🧁" },
  { name: "Cupcakes", slug: "cupcakes", accent: "Bite-size", icon: "🫶" },
  { name: "Pastries", slug: "pastries", accent: "French", icon: "🥐" },
  { name: "Eggless Cakes", slug: "eggless-cakes", accent: "Signature", icon: "🌿" },
] as const;

export const products: Product[] = [
  {
    id: 1,
    slug: "midnight-velvet-birthday",
    name: "Midnight Velvet Birthday Cake",
    category: "Birthday Cakes",
    badge: "Best Seller",
    description:
      "A luxurious midnight velvet cake finished with silky vanilla clouds, rose-gold shimmer, and celebration-ready drama.",
    priceCents: 249900,
    compareAtCents: 289900,
    rating: 5,
    reviewCount: 284,
    stock: 18,
    featured: true,
    bestseller: true,
    availability: "Ready today",
    deliveryText: "Delivered within 2-4 hours in metro zones",
    primaryImage:
      "https://images.pexels.com/photos/8015150/pexels-photo-8015150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    gallery: [
      "https://images.pexels.com/photos/8015150/pexels-photo-8015150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/11522869/pexels-photo-11522869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/9329433/pexels-photo-9329433.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    ],
    flavors: ["Vanilla Bean", "Belgian Chocolate", "Red Velvet", "Strawberry Cream"],
    sizes: ["6 inch", "8 inch", "10 inch"],
    weightOptions: ["1 kg", "1.5 kg", "2 kg"],
    tags: ["Birthday", "Premium", "Party", "Same Day"],
  },
  {
    id: 2,
    slug: "pearl-rose-wedding",
    name: "Pearl Rose Wedding Cake",
    category: "Wedding Cakes",
    badge: "Luxury",
    description:
      "A refined multi-tier wedding centerpiece with hand-piped florals, pearl details, and a flawless satin finish.",
    priceCents: 749900,
    compareAtCents: 849900,
    rating: 5,
    reviewCount: 192,
    stock: 6,
    featured: true,
    bestseller: true,
    availability: "Made to order",
    deliveryText: "48-hour bespoke delivery and venue setup available",
    primaryImage:
      "https://images.pexels.com/photos/11712500/pexels-photo-11712500.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    gallery: [
      "https://images.pexels.com/photos/11712500/pexels-photo-11712500.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/17315413/pexels-photo-17315413.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/20543564/pexels-photo-20543564.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    ],
    flavors: ["Madagascar Vanilla", "Hazelnut Praline", "Lemon Elderflower", "White Chocolate"],
    sizes: ["2 tier", "3 tier", "4 tier"],
    weightOptions: ["4 kg", "6 kg", "10 kg"],
    tags: ["Wedding", "Luxury", "Custom Florals", "Venue Delivery"],
  },
  {
    id: 3,
    slug: "anniversary-champagne",
    name: "Champagne Anniversary Cake",
    category: "Anniversary Cakes",
    badge: "Limited",
    description:
      "An elegant champagne-toned cake with golden edges, strawberry accents, and soft celebration sparkle.",
    priceCents: 329900,
    compareAtCents: 369900,
    rating: 5,
    reviewCount: 146,
    stock: 11,
    featured: true,
    availability: "Order before 5 PM for next-day delivery",
    deliveryText: "Premium gift packaging included",
    primaryImage:
      "https://images.pexels.com/photos/19498995/pexels-photo-19498995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    gallery: [
      "https://images.pexels.com/photos/19498995/pexels-photo-19498995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/11522869/pexels-photo-11522869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/17315455/pexels-photo-17315455.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    ],
    flavors: ["Champagne Vanilla", "Rose Pistachio", "Lemon Cream", "Berry Mascarpone"],
    sizes: ["6 inch", "8 inch", "9 inch"],
    weightOptions: ["1 kg", "2 kg", "2.5 kg"],
    tags: ["Anniversary", "Gift Box", "Elegant", "Romantic"],
  },
  {
    id: 4,
    slug: "couture-designer-cake",
    name: "Couture Designer Cake",
    category: "Designer Cakes",
    badge: "Signature",
    description:
      "An editorial-style designer cake with sculpted details, edible gold, and artisan finishing for standout moments.",
    priceCents: 429900,
    compareAtCents: 469900,
    rating: 5,
    reviewCount: 88,
    stock: 8,
    featured: true,
    availability: "Custom styling in 24 hours",
    deliveryText: "Our pastry artists confirm design before dispatch",
    primaryImage:
      "https://images.pexels.com/photos/9329433/pexels-photo-9329433.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    gallery: [
      "https://images.pexels.com/photos/9329433/pexels-photo-9329433.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/20586595/pexels-photo-20586595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/20586597/pexels-photo-20586597.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    ],
    flavors: ["Coffee Caramel", "Black Forest", "Almond Praline", "Salted Toffee"],
    sizes: ["6 inch", "8 inch", "10 inch"],
    weightOptions: ["1.5 kg", "2.5 kg", "3 kg"],
    tags: ["Designer", "Custom", "Artisan", "Gold Leaf"],
  },
  {
    id: 5,
    slug: "noir-chocolate-radiance",
    name: "Noir Chocolate Radiance Cake",
    category: "Chocolate Cakes",
    badge: "Indulgent",
    description:
      "Deep cocoa sponge, glossy ganache, truffle accents, and an intense chocolate finish for serious dessert lovers.",
    priceCents: 279900,
    compareAtCents: 319900,
    rating: 5,
    reviewCount: 365,
    stock: 24,
    bestseller: true,
    availability: "Always in demand",
    deliveryText: "Chocolate therapy, delivered chilled",
    primaryImage:
      "https://images.pexels.com/photos/1028711/pexels-photo-1028711.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    gallery: [
      "https://images.pexels.com/photos/1028711/pexels-photo-1028711.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/9271569/pexels-photo-9271569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/20586595/pexels-photo-20586595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    ],
    flavors: ["Belgian Dark Chocolate", "Mocha Fudge", "Chocolate Hazelnut", "Triple Cocoa"],
    sizes: ["6 inch", "8 inch", "12 inch"],
    weightOptions: ["1 kg", "2 kg", "3 kg"],
    tags: ["Chocolate", "Ganache", "Best Seller", "Giftable"],
  },
  {
    id: 6,
    slug: "fruit-garden-fresh",
    name: "Fruit Garden Fresh Cake",
    category: "Fruit Cakes",
    badge: "Fresh",
    description:
      "A bright, seasonal fruit cake with silky cream, jewel-toned fruit layers, and a clean garden-inspired finish.",
    priceCents: 219900,
    compareAtCents: 249900,
    rating: 4,
    reviewCount: 97,
    stock: 17,
    availability: "Made fresh every morning",
    deliveryText: "Best enjoyed on the same day",
    primaryImage:
      "https://images.pexels.com/photos/34623625/pexels-photo-34623625.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    gallery: [
      "https://images.pexels.com/photos/34623625/pexels-photo-34623625.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/6783155/pexels-photo-6783155.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/11522869/pexels-photo-11522869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    ],
    flavors: ["Mixed Berry", "Mango Cream", "Pineapple Delight", "Peach Vanilla"],
    sizes: ["6 inch", "8 inch"],
    weightOptions: ["1 kg", "1.5 kg", "2 kg"],
    tags: ["Fresh", "Light", "Seasonal", "Fruit"],
  },
  {
    id: 7,
    slug: "confetti-kids-celebration",
    name: "Confetti Kids Celebration Cake",
    category: "Kids Cakes",
    badge: "Playful",
    description:
      "Bright, joyful, and irresistibly fun with colorful sprinkles, playful figures, and a cheerful birthday spirit.",
    priceCents: 259900,
    compareAtCents: 299900,
    rating: 5,
    reviewCount: 211,
    stock: 14,
    availability: "Popular with 24-hour pre-order",
    deliveryText: "Character toppers available on request",
    primaryImage:
      "https://images.pexels.com/photos/12102394/pexels-photo-12102394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    gallery: [
      "https://images.pexels.com/photos/12102394/pexels-photo-12102394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/14197884/pexels-photo-14197884.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/14525773/pexels-photo-14525773.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    ],
    flavors: ["Vanilla Rainbow", "Chocolate Fudge", "Strawberry Bubblegum", "Cookies & Cream"],
    sizes: ["6 inch", "8 inch", "10 inch"],
    weightOptions: ["1 kg", "2 kg"],
    tags: ["Kids", "Colorful", "Fun", "Sprinkles"],
  },
  {
    id: 8,
    slug: "blackberry-cupcake-couture",
    name: "Blackberry Cupcake Couture Box",
    category: "Cupcakes",
    badge: "Box Set",
    description:
      "A couture cupcake assortment with blackberry crowns, silky frosting swirls, and refined gifting presentation.",
    priceCents: 139900,
    compareAtCents: 159900,
    rating: 5,
    reviewCount: 138,
    stock: 31,
    bestseller: true,
    availability: "Ready in box sets of 6 or 12",
    deliveryText: "Perfect for meetings, gifting, and events",
    primaryImage:
      "https://images.pexels.com/photos/17890893/pexels-photo-17890893.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    gallery: [
      "https://images.pexels.com/photos/17890893/pexels-photo-17890893.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/20586595/pexels-photo-20586595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/11522869/pexels-photo-11522869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    ],
    flavors: ["Blackberry Vanilla", "Lemon Cream", "Chocolate Berry", "Pistachio Rose"],
    sizes: ["Box of 6", "Box of 12"],
    weightOptions: ["Mini", "Standard"],
    tags: ["Cupcakes", "Gift Box", "Office Treat", "Luxury"],
  },
  {
    id: 9,
    slug: "paris-butter-pastry-box",
    name: "Paris Butter Pastry Box",
    category: "Pastries",
    badge: "Artisan",
    description:
      "Flaky French-style pastries with glossy finishes, delicate fillings, and a luxury morning ritual feel.",
    priceCents: 109900,
    compareAtCents: 129900,
    rating: 4,
    reviewCount: 74,
    stock: 29,
    availability: "Freshly baked twice daily",
    deliveryText: "Ideal for breakfast hampers and brunch tables",
    primaryImage:
      "https://images.pexels.com/photos/34364452/pexels-photo-34364452.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    gallery: [
      "https://images.pexels.com/photos/34364452/pexels-photo-34364452.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/29380150/pexels-photo-29380150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/9329433/pexels-photo-9329433.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    ],
    flavors: ["Butter Croissant", "Almond Cream", "Chocolate Hazelnut", "Berry Danish"],
    sizes: ["Single", "Box of 4", "Box of 8"],
    weightOptions: ["Standard", "Mini"],
    tags: ["Pastries", "Breakfast", "French", "Fresh"],
  },
  {
    id: 10,
    slug: "saffron-eggless-signature",
    name: "Saffron Eggless Signature Cake",
    category: "Eggless Cakes",
    badge: "Signature",
    description:
      "A fragrant eggless masterpiece infused with saffron, cardamom, and premium cream for elegant celebrations.",
    priceCents: 229900,
    compareAtCents: 259900,
    rating: 5,
    reviewCount: 121,
    stock: 22,
    featured: true,
    availability: "Eggless and festival-ready",
    deliveryText: "Loved for intimate gatherings and gifting",
    primaryImage:
      "https://images.pexels.com/photos/20586597/pexels-photo-20586597.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    gallery: [
      "https://images.pexels.com/photos/20586597/pexels-photo-20586597.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/20586595/pexels-photo-20586595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
      "https://images.pexels.com/photos/19498995/pexels-photo-19498995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    ],
    flavors: ["Saffron Pistachio", "Vanilla Almond", "Mango Rose", "Cardamom Cream"],
    sizes: ["6 inch", "8 inch", "10 inch"],
    weightOptions: ["1 kg", "1.5 kg", "2 kg"],
    tags: ["Eggless", "Festival", "Signature", "Elegant"],
  },
];

export const testimonials = [
  {
    name: "Aanya Mehta",
    role: "Bride",
    quote:
      "The wedding cake looked like couture art. Every layer was elegant, and the delivery team was incredibly professional.",
    rating: 5,
  },
  {
    name: "Kabir Sethi",
    role: "Corporate client",
    quote:
      "We ordered custom cupcakes for a brand launch and the packaging, flavor, and on-time delivery were flawless.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Regular customer",
    quote:
      "Sweet Delights feels premium from the first click to the last bite. The design detail is exceptional.",
    rating: 5,
  },
] as const;

export const reasons = [
  {
    title: "Artisan craftsmanship",
    description: "Every cake is styled by pastry artists using premium ingredients, hand finishes, and clean compositions.",
  },
  {
    title: "Luxury packaging",
    description: "Gift-ready boxes, satin ribbons, and temperature-safe packaging preserve the experience end-to-end.",
  },
  {
    title: "Same-day delivery",
    description: "Fast local delivery for celebrations, corporate gifting, and last-minute premium dessert orders.",
  },
  {
    title: "Customization studio",
    description: "Choose flavor, size, message, image upload, and delivery schedule with live pricing updates.",
  },
] as const;

export const team = [
  {
    name: "Nadia Kapoor",
    role: "Founder & Executive Pastry Chef",
    image:
      "https://images.pexels.com/photos/30241280/pexels-photo-30241280.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  },
  {
    name: "Rohan Verma",
    role: "Head of Cake Design",
    image:
      "https://images.pexels.com/photos/20543564/pexels-photo-20543564.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  },
  {
    name: "Mira Solanki",
    role: "Customer Experience Director",
    image:
      "https://images.pexels.com/photos/29380150/pexels-photo-29380150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
  },
] as const;

export const orderStages = [
  { key: "received", label: "Order received", description: "We’ve confirmed your order and are preparing the kitchen schedule." },
  { key: "preparing", label: "Preparing", description: "Our team checks ingredients, packaging, and custom requests." },
  { key: "baking", label: "Baking", description: "Your cake is in the oven and being finished with artisan precision." },
  { key: "out_for_delivery", label: "Out for delivery", description: "Our courier is on the way with temperature-safe packaging." },
  { key: "delivered", label: "Delivered", description: "Your order has arrived safely and ready to delight." },
] as const;

export const paymentMethods = [
  { id: "stripe", label: "Stripe", description: "Card, Apple Pay, Google Pay" },
  { id: "razorpay", label: "Razorpay", description: "UPI, wallets, cards" },
  { id: "cod", label: "Cash on Delivery", description: "Available for eligible local orders" },
] as const;

export const dashboardTabs = ["Overview", "Orders", "Wishlist", "Addresses", "Security"] as const;

export const adminTabs = ["Analytics", "Products", "Orders", "Customers", "Coupons", "Inventory", "Reviews"] as const;

export function formatCurrency(amountInCents: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountInCents / 100);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRecommendedProducts(slug: string, limit = 4) {
  const current = getProductBySlug(slug);
  return products
    .filter((product) => product.slug !== slug)
    .sort((a, b) => {
      const categoryScoreA = current && a.category === current.category ? 1 : 0;
      const categoryScoreB = current && b.category === current.category ? 1 : 0;
      if (categoryScoreA !== categoryScoreB) return categoryScoreB - categoryScoreA;
      return b.rating - a.rating;
    })
    .slice(0, limit);
}

export function getBestSellers(limit = 4) {
  return products.filter((product) => product.bestseller || product.featured).slice(0, limit);
}
