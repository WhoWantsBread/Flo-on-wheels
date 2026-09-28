/*
 * Site content lives here. Edit this file to change shop info, products and services.
 *
 * Anything marked TODO is placeholder content that needs real info from the shop.
 * Product prices below are SAMPLES — confirm current pricing before launch.
 */

const SHOP = {
  name: "Flo On Wheels Cycles",
  email: "floonwheels87@gmail.com",
  // Same hours at both locations
  hours: [
    ["Mon – Fri", "11:00 AM – 6:00 PM"],
    ["Saturday", "10:00 AM – 5:00 PM"],
    ["Sunday", "Closed"],
  ],
};

/*
 * Store locations.
 *   ebikes: true if the location sells and services e-bikes.
 *   Products with category "ebikes" can only be reserved at locations with ebikes: true.
 */
const LOCATIONS = [
  {
    id: "hoboken",
    name: "Hoboken",
    street: "1222 Washington St",
    city: "Hoboken, NJ 07030",
    phone: "+12017985589",
    phoneDisplay: "(201) 798-5589",
    ebikes: false,
    specialty: "Bicycles: road, gravel, mountain, city and kids' bikes, parts and gear.",
  },
  {
    id: "wny",
    name: "West New York",
    street: "604 60th St",
    city: "West New York, NJ 07093",
    phone: "+12013308303",
    phoneDisplay: "(201) 330-8303",
    ebikes: true,
    specialty: "E-bikes and bicycles, including e-bike sales, service and diagnostics.",
  },
];

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
 *   credit    optional photo credit { author, license, licenseUrl, source } — required for CC-licensed photos,
 *             shown under the photo and on credits.html. Omit for the shop's own / official Specialized photos.
 *   featured  true to show on the home page
 *   inStock   false shows "Special order"
 *   sizes     optional list
 *   description
 */
const PRODUCTS = [
  {
    id: "turbo-vado-4",
    image: "images/products/turbo-vado-4.jpg",
    credit: { author: "Matti Blume", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Specialized_Turbo_Tero,_Cycling_World_Europe_2025,_Meerbusch_(P1045273).jpg" },
    name: "Turbo Vado 4.0",
    brand: "Specialized",
    category: "ebikes",
    price: 4000,
    featured: true,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A do-it-all commuter e-bike with a smooth, quiet motor, integrated lights and fenders, and plenty of range for daily trips along the Hudson and into the city.",
  },
  {
    id: "turbo-como-3",
    image: "images/products/turbo-como-3.jpg",
    credit: { author: "Cjp24", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Gitane,_VAE_(1).jpg" },
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
    image: "images/products/turbo-levo.jpg",
    credit: { author: "Matti Blume", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:S-Works_Turbo_Levo_4,_VELO_2025,_Berlin_(P1047023).jpg" },
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
    image: "images/products/allez.jpg",
    credit: { author: "Keanu @ no:wp", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Specialized_road_bike.JPG" },
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
    image: "images/products/diverge-e5.jpg",
    credit: { author: "Matti Blume", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Crossworx,_Velo_24,_Berlin_(VB243512).jpg" },
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
    image: "images/products/rockhopper.jpg",
    credit: { author: "Cordless Larry", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Specialized_Rockhopper_Expert_Disc_2009.jpg" },
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
    image: "images/products/sirrus-2.jpg",
    credit: { author: "Ocdp", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Specialized_Sirrus_2007_001.jpg" },
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
    image: "images/products/jett-20.jpg",
    credit: { author: "Matti Blume", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Rascal,_Eurobike_2024,_Frankfurt_am_Main_(EB245538).jpg" },
    name: "Jett 20",
    brand: "Specialized",
    category: "kids",
    price: 450,
    inStock: true,
    description: "A lightweight 20\" kids' bike with easy gearing, sized for young riders around 6–9 years old.",
  },
  {
    id: "tube-700c",
    image: "images/products/tube-700c.jpg",
    credit: { author: "Oostblokblik", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Barum_bicycle_inner_tube.jpg" },
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
    image: "images/products/chain-11.jpg",
    credit: { author: "Cjp24", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Racing_bicycle_chain_(detail).jpg" },
    name: "11-Speed Chain",
    brand: "Shimano",
    category: "parts",
    price: 45,
    inStock: true,
    description: "Replacement 11-speed chain. Ask us about installation when you pick it up.",
  },
  {
    id: "helmet-align",
    image: "images/products/helmet-align.jpg",
    credit: { author: "Tejvan Pettinger", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", source: "https://commons.wikimedia.org/wiki/File:Helmet_bike.jpg" },
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
    image: "images/products/u-lock.jpg",
    credit: { author: "WrS.tm.pl", license: "Public domain", licenseUrl: "", source: "https://commons.wikimedia.org/wiki/File:The_bike_is_secured_with_a_U_lock._Tomasz%C3%B3w_Mazowiecki,_Poland.jpg" },
    name: "Heavy-Duty U-Lock",
    brand: "Kryptonite",
    category: "accessories",
    price: 90,
    inStock: true,
    description: "A must in the city. High-security U-lock with a mounting bracket.",
  },
  {
    id: "light-set",
    image: "images/products/light-set.jpg",
    credit: { author: "Singlespeedfahrer", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Fahrrad_R%C3%BCckleuchte_Sigma_Hiro.jpg" },
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
    locations: ["wny"], // only offered at these location ids; omit for all locations
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
