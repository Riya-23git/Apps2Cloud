# Apps2Cloud v2 — Premium Interactive Services Website

React SPA with interactive portfolio showcase, service detail pages, project modals, and demo/case study sections.

## 🚀 Quick Start

```bash
cd Appstech
npm install
npm start         # → http://localhost:3000
npm run build     # Production build in /build
```

## 📁 File Map

```
src/
├── App.js                         # Router, theme context (dark/light)
├── index.js / index.css           # Entry + global design tokens
├── data.js                        # ★ Central data store (services + projects)
│
├── components/
│   ├── Navbar.js / .css           # Sticky nav, dark/light toggle, mobile menu
│   ├── Footer.js / .css           # Full footer with service links
│   ├── PortfolioGallery.js / .css # ★ Reusable filterable project grid + stats
│   └── ProjectModal.js / .css     # ★ Full modal: carousel, metrics, features, CTAs
│
└── pages/
    ├── Home.js / .css             # Hero (canvas), stats, services grid, portfolio preview
    ├── ServicesPage.js / .css     # ★ 3-tab: All Services | Detailed View | Portfolio
    ├── ServiceDetailPage.js / .css # ★ Per-service deep dive (/services/:slug)
    ├── PortfolioPage.js           # Full portfolio gallery page
    ├── AboutPage.js               # Team, timeline, vision/mission, values
    ├── BlogPage.js                # Blog grid with tag filter + newsletter
    └── ContactPage.js            # Form with validation + contact info
```

## 🔑 Key Features

| Feature | Details |
|---|---|
| 7 Service Cards | Click → `/services/:slug` detail page |
| 16 Portfolio Projects | ERP, Web, Mobile, Cloud — with real metrics |
| Project Modal | Screenshot carousel, metrics grid, features, tech, CTAs |
| 3-Tab Services Page | All Services / Detailed View / Portfolio Showcase |
| Portfolio Filter | All · Web Apps · Mobile · Cloud · ERP |
| Dark / Light Mode | Toggle with localStorage persistence |
| Animated Counters | Stats count up on scroll into view |
| Scroll Reveal | Cards fade in with staggered delay |
| Canvas Hero | Particle network animation |
| WhatsApp Float | Pre-filled message button |

## 🗺️ Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/services` | Services (3-tab) |
| `/services/erp-software` | ERP Detail |
| `/services/web-applications` | Web Apps Detail |
| `/services/mobile-apps` | Mobile Detail |
| `/services/cloud-hosting` | Cloud Hosting Detail |
| `/services/construction-management` | Construction Detail |
| `/services/billing-software` | Billing Detail |
| `/services/it-consulting` | Consulting Detail |
| `/portfolio` | Full Portfolio |
| `/about` | About |
| `/blog` | Blog |
| `/contact` | Contact |

## ⚙️ Customization

**Company info** → `src/App.js` (WhatsApp link), `src/components/Footer.js`  
**Services data** → `src/data.js` → `SERVICES` array  
**Portfolio projects** → `src/data.js` → `PROJECTS` array  
**Colors** → `src/index.css` → `:root` CSS variables  

## 🚀 Deploy

**Netlify:** `npm run build` → drag `/build` to netlify.com/drop  
**Vercel:** `vercel --prod`  

Add `public/_redirects` for React Router:
```
/*  /index.html  200
```
