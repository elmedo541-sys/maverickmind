# MaverickMind — Next.js Rewrite

This is your MaverickMind site rebuilt in **Next.js** so it can run on
**Vercel's free hosting**. It replaces:

| Old stack               | New stack                          |
|--------------------------|-------------------------------------|
| PHP                      | Next.js (App Router, TypeScript)   |
| Apache (local server)    | Vercel (serverless, free tier)     |
| MySQL (local, via XAMPP) | Neon Postgres (free, serverless)   |
| Local `/uploads` folder  | Vercel Blob storage (free tier)    |
| `$_SESSION` admin login  | Signed cookie session (JWT)        |

All pages and admin features from the original PHP site are here:
Home, Products (search/filter), Product details, Services, About,
Contact form → Inquiries, and the full admin panel (login, dashboard,
products CRUD, services CRUD, inquiries list/delete).

---

## 1. Open this in VS Code

Unzip the project and open the folder in VS Code. You'll need
**Node.js 18+** installed (Apache/MySQL/XAMPP are no longer needed —
you can uninstall or ignore them for this project).

```bash
npm install
```

---

## 2. Create a free Neon Postgres database

1. Go to https://neon.tech and sign up (free tier).
2. Create a new project.
3. On the project dashboard, copy the **pooled connection string** and
   the **direct connection string** (Neon shows both — direct is used
   for migrations).
4. Copy `.env.example` to `.env` and fill in:

```
DATABASE_URL="<pooled connection string>"
DIRECT_URL="<direct connection string>"
SESSION_SECRET="<any long random string>"
```

You can leave `BLOB_READ_WRITE_TOKEN` blank for now — you'll add it
after connecting Blob storage in step 5.

---

## 3. Create the database tables

```bash
npm run db:push
```

This reads `prisma/schema.prisma` and creates the `products`,
`categories`, `brands`, `services`, `inquiries`, and `admin` tables in
Neon — equivalent to the SQL you'd run to set up MySQL, but automatic.

---

## 4. Create your admin login

```bash
SEED_ADMIN_USERNAME=admin SEED_ADMIN_PASSWORD=yourpassword npm run db:seed
```

This creates your admin account (password is hashed, never stored in
plain text) and a few starter product categories. Change
`yourpassword` to whatever you want. You can log in later at
`/admin/login`.

---

## 5. Run it locally

```bash
npm run dev
```

Visit http://localhost:3000 for the site and
http://localhost:3000/admin/login for the admin panel.

Image uploads won't work locally until Blob storage is connected —
that happens automatically once deployed to Vercel (step 7).

---

## 6. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
```

Create a new repo on GitHub and push:

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

---

## 7. Deploy to Vercel (free)

1. Go to https://vercel.com, sign up/log in, click **Add New → Project**,
   and import your GitHub repo.
2. Before deploying, add **Environment Variables** (from your `.env`):
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `SESSION_SECRET`
3. Click **Deploy**.
4. Once deployed, go to your project → **Storage** tab → **Create
   Database → Blob**. Connect it to your project — Vercel will
   automatically add `BLOB_READ_WRITE_TOKEN` as an environment
   variable for you (no manual copying needed).
5. Redeploy (Vercel → Deployments → ⋯ → Redeploy) so the new env var
   takes effect.

Your site is now live on a free `*.vercel.app` URL, with a real
database and working image uploads — no server to maintain.

---

## Notes on things that changed from the PHP version

- **Prices** are stored precisely (Decimal) and displayed with a ₱
  symbol — change the symbol in `components/ProductCard.tsx` and
  `app/products/[id]/page.tsx` if you'd rather use a different currency.
- **Brands**: on "Add Product" you type a brand name (auto-created if
  new), matching your original `add_product.php` behavior. On "Edit
  Product" you pick from existing brands via dropdown, matching your
  original `edit_product.php`.
- **Image uploads** accept `.jpg`, `.jpeg`, `.png`, `.webp`, same as
  the original validation.
- To change your admin password later, run `npm run db:seed` again
  with a new `SEED_ADMIN_PASSWORD`, or add a "change password" screen
  yourself — ask me if you'd like that built.

---

## Project structure

```
app/                    Pages & routes (App Router)
  admin/                Admin panel (protected by middleware.ts)
  products/, services/, about/, contact/   Public pages
components/             Shared UI (Navbar, Footer, ProductCard)
lib/                    Database client (Prisma) & session/auth helpers
prisma/schema.prisma    Database schema (replaces your MySQL tables)
prisma/seed.ts          Creates admin user + starter categories
middleware.ts           Protects /admin/* routes, redirects to login
```
