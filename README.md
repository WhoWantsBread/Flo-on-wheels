# Flo On Wheels Cycles: Website

Website for **Flo On Wheels Cycles**, a Specialized dealer with two shops in New Jersey.

> **Status: demo.** Products, prices, service rates, team bios and shop history are placeholders.
> Search the project for `TODO` to find everything that still needs real content.

| Location | Address | Phone | Sells |
|---|---|---|---|
| Hoboken | 1222 Washington St, Hoboken, NJ 07030 | (201) 798-5589 | Bicycles |
| West New York | 604 60th St, West New York, NJ 07093 | (201) 330-8303 | E-bikes + bicycles |

- **Email:** floonwheels87@gmail.com
- **Hours (both):** Mon–Fri 11 AM–6 PM · Sat 10 AM–5 PM · Sun closed

## Features

- **Shop catalog** with category filters, search and price sorting
- **Product pages** with size selection
- **Reserve for in-store pickup.** Customers build a pickup list and send it to the shop.
  There's no online payment; customers pay in store.
- **Repairs & service** price menu
- **Free lifetime tune-ups** on bikes bought from the shop (home page banner, bike product pages, Services page)
- **About** page with the shop story, milestones and team
- **Contact** page with a message form, hours and a Google Map
- Mobile-friendly layout

## Tech

Plain HTML, CSS and JavaScript, with no framework, no build step and nothing to install.
It can be hosted on any static host (GitHub Pages, Netlify, Cloudflare Pages).

```
├── index.html        Home
├── shop.html         Catalog with filters, search and sort
├── product.html      Product detail (product.html?id=<product-id>)
├── pickup.html       Pickup list and request form
├── services.html     Repair and service prices
├── about.html        Story, milestones, team
├── contact.html      Contact info, form, map
├── credits.html      Photo credits (generated from `credit` fields in data.js)
├── css/styles.css    All styling (colors are CSS variables at the top)
├── js/data.js        ← All editable content: shop info, products, services, team
├── js/main.js        Shared header/footer and page logic
└── images/
    ├── products/     Product photos
    └── team/         Staff photos
```

## Editing content

Almost everything lives in **`js/data.js`**:

| Section | What it controls |
|---|---|
| `SHOP` | Name, email, hours (shared by both shops) |
| `LOCATIONS` | Each shop's address, phone, and whether it sells e-bikes (e-bikes can only be reserved where `ebikes: true`) |
| `CATEGORIES` | Shop categories and filter buttons |
| `PRODUCTS` | The catalog: name, brand, category, price, sizes, photo, stock status, featured |
| `SERVICES` | Repair menu and prices (`locations: [...]` limits a group to certain shops) |
| `TEAM` | Staff names, roles, bios, photos |

**To add a product,** copy an existing entry in `PRODUCTS`, give it a unique `id`
(lowercase with dashes, no spaces), and set `featured: true` to show it on the home page.

### Photos

- **Products:** put files in `images/products/` and add `image: "images/products/turbo-vado-4.jpg"`
  to the product. Landscape 4:3 works best (e.g. 1200×900 JPG, under about 300 KB).
- **Team:** put files in `images/team/` and add `photo: "images/team/flo.jpg"` to the team member.
  Square works best (e.g. 400×400).
- Use lowercase file names with dashes and no spaces. File names are case-sensitive once online.
- Items without a photo show a simple drawing instead.

**About the current product photos:** they're **sample images from Wikimedia Commons** used under free licenses
(CC BY, CC BY-SA, CC0, public domain). Most aren't the exact model listed. Each product has a `credit` field in `data.js`;
the credit is shown under the photo and on `credits.html`, as the licenses require. When you replace a photo with
the shop's own or an official Specialized image, delete that product's `credit` line too.

## Preview locally

Open `index.html` in a browser, or run a local server:

```sh
npx serve .
```

## Deploy

**GitHub Pages:** the repo must be public on a free GitHub plan. Go to **Settings → Pages → Build and deployment**,
choose *Deploy from a branch*, select `main` and `/ (root)`, then save. The site will be at
`https://<username>.github.io/Flo_bikeshop_site/`.

**Netlify (works with private repos):** go to [app.netlify.com](https://app.netlify.com), choose *Add new site → Import from Git*,
and pick this repo. Leave the build command empty and set the publish directory to `/`.

## Roadmap

- [ ] Real product list, prices and photos
- [ ] Real service prices, team bios and shop history
- [ ] Logo and brand colors
- [ ] Send forms through Formspree / Netlify Forms instead of opening the customer's email app
- [ ] Custom domain
- [ ] SEO: Google Business Profile, structured business data, sitemap
- [ ] Confirm Specialized's online-listing and advertised-price rules for dealers
