/*
 * Site content lives here. Edit this file to change shop info, products and services.
 *
 * Anything marked TODO is placeholder content that needs real info from the shop.
 * Product prices below are SAMPLES — confirm current pricing before launch.
 */

const SHOP = {
  name: "Flo On Wheels Cycles",
  street: "1222 Washington St",
  city: "Hoboken, NJ 07030",
  phone: "+12017985589",
  phoneDisplay: "(201) 798-5589",
  email: "floonwheels87@gmail.com",
  hours: [
    ["Mon – Fri", "11:00 AM – 6:00 PM"],
    ["Saturday", "10:00 AM – 5:00 PM"],
    ["Sunday", "Closed"],
  ],
};

const CATEGORIES = [
  { id: "ebikes", label: "E-Bikes" },
  { id: "road", label: "Road & Gravel" },
  { id: "mountain", label: "Mountain" },
  { id: "city", label: "City & Fitness" },
  { id: "kids", label: "Kids" },
  { id: "parts", label: "Parts" },
  { id: "accessories", label: "Accessories & Gear" },
];

/*
 * Product fields:
 *   id        unique, URL-safe (used in product.html?id=...)
 *   name, brand, category (one of CATEGORIES ids), price (number, USD)
 *   image     optional path, e.g. "images/products/turbo-vado.jpg" — a placeholder is drawn if missing
 *   featured  true to show on the home page
 *   inStock   false shows "Special order"
 *   sizes     optional list
 *   description
 */
const PRODUCTS = [
  {
    id: "turbo-vado-4",
    name: "Turbo Vado 4.0",
    brand: "Specialized",
    category: "ebikes",
    price: 4000,
    featured: true,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A do-it-all commuter e-bike with a smooth, quiet motor, integrated lights and fenders, and plenty of range for daily trips across Hoboken and into the city.",
  },
  {
    id: "turbo-como-3",
    name: "Turbo Como 3.0",
    brand: "Specialized",
    category: "ebikes",
    price: 2800,
    featured: true,
    inStock: true,
    sizes: ["S", "M", "L"],
    description:
      "Upright, comfortable and easy to get on and off. A relaxed e-bike for errands, cruising the waterfront and getting around town.",
  },
  {
    id: "turbo-levo",
    name: "Turbo Levo",
    brand: "Specialized",
    category: "ebikes",
    price: 6500,
    inStock: false,
    sizes: ["S2", "S3", "S4", "S5"],
    description: "Full-suspension electric mountain bike built for climbing and descending technical trails.",
  },
  {
    id: "allez",
    name: "Allez",
    brand: "Specialized",
    category: "road",
    price: 1100,
    featured: true,
    inStock: true,
    sizes: ["49", "52", "54", "56", "58"],
    description: "A light aluminum road bike and a great first step into road riding.",
  },
  {
    id: "diverge-e5",
    name: "Diverge E5",
    brand: "Specialized",
    category: "road",
    price: 1300,
    inStock: true,
    sizes: ["49", "52", "54", "56", "58"],
    description: "Go-anywhere gravel bike with room for wide tires, ready for pavement, dirt and everything between.",
  },
  {
    id: "rockhopper",
    name: "Rockhopper",
    brand: "Specialized",
    category: "mountain",
    price: 800,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A capable, affordable hardtail mountain bike for new riders and weekend trails.",
  },
  {
    id: "sirrus-2",
    name: "Sirrus 2.0",
    brand: "Specialized",
    category: "city",
    price: 750,
    featured: true,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A fast, flat-bar fitness bike. Great for commuting, workouts and weekend rides.",
  },
  {
    id: "jett-20",
    name: "Jett 20",
    brand: "Specialized",
    category: "kids",
    price: 450,
    inStock: true,
    description: "A lightweight 20\" kids' bike with easy gearing, sized for young riders around 6–9 years old.",
  },
  {
    id: "tube-700c",
    name: "Inner Tube 700c",
    brand: "Specialized",
    category: "parts",
    price: 10,
    inStock: true,
    sizes: ["700x20-28", "700x28-38", "700x38-47"],
    description: "Presta valve inner tube. Bring your old tube if you're not sure of the size.",
  },
  {
    id: "chain-11",
    name: "11-Speed Chain",
    brand: "Shimano",
    category: "parts",
    price: 45,
    inStock: true,
    description: "Replacement 11-speed chain. Ask us about installation when you pick it up.",
  },
  {
    id: "helmet-align",
    name: "Align II Helmet",
    brand: "Specialized",
    category: "accessories",
    price: 50,
    inStock: true,
    sizes: ["S/M", "M/L", "XL"],
    description: "Comfortable, well-ventilated everyday helmet with MIPS protection.",
  },
  {
    id: "u-lock",
    name: "Heavy-Duty U-Lock",
    brand: "Kryptonite",
    category: "accessories",
    price: 90,
    inStock: true,
    description: "A must in Hoboken. High-security U-lock with a mounting bracket.",
  },
  {
    id: "light-set",
    name: "Rechargeable Light Set",
    brand: "Specialized",
    category: "accessories",
    price: 70,
    inStock: true,
    description: "USB-rechargeable front and rear lights, bright enough for evening commutes.",
  },
];

// TODO: confirm real service menu and prices with the shop
const SERVICES = [
  {
    group: "Tune-Ups",
    items: [
      { name: "Basic Tune-Up", price: "$75", desc: "Adjust brakes and gears, true wheels, inflate tires, safety check." },
      { name: "Full Tune-Up", price: "$150", desc: "Everything in Basic, plus drivetrain clean and bearing adjustments." },
      { name: "Overhaul", price: "$275", desc: "Full teardown, deep clean, regrease and rebuild. Parts extra." },
    ],
  },
  {
    group: "Repairs",
    items: [
      { name: "Flat Fix", price: "$20 + tube", desc: "Tube replacement, most bikes done while you wait." },
      { name: "Brake Adjustment", price: "$25", desc: "Per wheel. Rim or disc." },
      { name: "Gear Adjustment", price: "$25", desc: "Front or rear derailleur tuning." },
      { name: "Wheel True", price: "$30", desc: "Straighten a wobbly wheel." },
    ],
  },
  {
    group: "E-Bike Service",
    items: [
      { name: "E-Bike Tune-Up", price: "$125", desc: "Full tune-up plus motor, battery and firmware check." },
      { name: "Diagnostics", price: "$60", desc: "Troubleshoot motor, battery or display issues." },
    ],
  },
  {
    group: "Fitting & Assembly",
    items: [
      { name: "Basic Bike Fit", price: "$50", desc: "Saddle height, reach and cockpit set-up. Free with a new bike purchase." },
      { name: "Bike Build", price: "$100", desc: "Assembly of a bike bought elsewhere or shipped in a box." },
    ],
  },
];

// TODO: replace with the real team. Optional photo: put a square image in images/team/ and add  photo: "images/team/flo.jpg"
const TEAM = [
  { name: "Flo", role: "Owner & Head Mechanic", bio: "TODO: a few sentences about Flo, how they got into bikes, and what they love to ride." },
  { name: "Team Member", role: "Mechanic", bio: "TODO: short bio." },
  { name: "Team Member", role: "Sales & Fitting", bio: "TODO: short bio." },
];
