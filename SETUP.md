# TinaCMS + React + TypeScript + Tailwind CSS + Vercel Setup Guide

## Prerequisites

- Node.js 18+
- GitHub account
- Vercel account
- TinaCloud account (free at Tina.io)

## 1. Scaffold the project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:
```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

Add Tailwind directives to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 2. Install TinaCMS

```bash
npm install tinacms @tinacms/cli
```

Initialize TinaCMS (creates `tina/` folder with config):
```bash
npx tinacms init
```

## 3. Set up TinaCMS config

Edit `tina/config.ts`:

```ts
import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: 'master',
  clientId: '<YOUR_CLIENT_ID>',
  token: '<YOUR_TOKEN>',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'images',
    },
  },
  schema: {
    collections: [
      {
        name: 'home',
        label: 'Homepage',
        path: 'src/content',
        format: 'json',
        match: { include: 'home' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heroTitle', label: 'Hero Title' },
          { type: 'string', name: 'heroSubtitle', label: 'Hero Subtitle', ui: { component: 'textarea' } },
          { type: 'image', name: 'heroImage', label: 'Hero Image' },
          { type: 'string', name: 'ctaText', label: 'CTA Button Text' },
          { type: 'string', name: 'ctaLink', label: 'CTA Button Link' },
        ],
      },
      {
        name: 'service',
        label: 'Services',
        path: 'src/content',
        format: 'json',
        match: { include: 'services' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'sectionTitle', label: 'Section Title' },
          { type: 'string', name: 'sectionSubtitle', label: 'Section Subtitle', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'services',
            label: 'Service Cards',
            list: true,
            fields: [
              { type: 'string', name: 'title', label: 'Title' },
              { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
              { type: 'image', name: 'image', label: 'Image' },
              { type: 'string', name: 'icon', label: 'Icon (emoji)' },
            ],
          },
        ],
      },
    ],
  },
})
```

> **Important:** Hardcode `branch`, `clientId`, and `token` in the config file. Using `process.env.X` will NOT work on Vercel because Vite only auto-loads `VITE_`-prefixed env vars at build time.

## 4. Create content JSON files

Place these in `src/content/`:

- `home.json` — homepage hero, about, testimonials
- `services.json` — services list
- `gallery.json` — gallery images
- `contact.json` — contact info, social links

Format example (`src/content/home.json`):
```json
{
  "heroTitle": "Title",
  "heroSubtitle": "Subtitle",
  "heroImage": "/images/hero.jpg",
  "ctaText": "Get Started",
  "ctaLink": "#contact",
  "about": {
    "title": "About Us",
    "description": "Description text",
    "image": "/images/about.jpg"
  },
  "testimonials": {
    "title": "What Clients Say",
    "items": [
      { "quote": "Great work!", "author": "John", "role": "CEO" }
    ]
  }
}
```

## 5. Configure package.json scripts

```json
"scripts": {
  "dev": "tinacms dev -c \"vite\"",
  "build": "tsc -b && tinacms build --skip-cloud-checks && vite build",
  "preview": "vite preview"
}
```

The `--skip-cloud-checks` flag prevents the build from failing when TinaCloud hasn't indexed the branch yet.

## 6. Build TinaCMS admin

```bash
npx tinacms build --skip-cloud-checks
```

This generates the admin SPA at `public/admin/`.

## 7. Set up Vercel deployment

Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/admin/:path*", "destination": "/admin/index.html" }
  ]
}
```

Push to GitHub and import the repo into Vercel.
No environment variables needed on Vercel (values are hardcoded in config).

## 8. Register branch on TinaCloud

1. Go to **https://app.tina.io**
2. Open your project
3. Go to **Branches** tab → **Refresh Branches** → **Register** next to your branch (e.g., `master`)

If you see "Index version '0' no longer supported", click **Reindex** on the project dashboard.

## 9. Access the admin

Visit `https://your-domain.vercel.app/admin`

## Tips

- **Images:** Place them in `public/images/` and reference as `/images/filename.jpg`
- **TypeScript errors after regenerating types:** Cast JSON imports with `as any` in your pages:
  ```ts
  services={servicesData.services as any}
  ```
- **Content (Read-only) token:** Safe to hardcode — it's exposed in the browser anyway at `/admin`
- **For production:** Review content under each section before publishing
