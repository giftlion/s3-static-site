# React Static Site - AWS S3 Deployment

A React + TypeScript app (Vite) with automated CI/CD deployment to AWS S3 using GitHub Actions.

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD workflow
├── src/
│   ├── components/
│   │   ├── FeatureCard.tsx     # Feature card with intersection observer
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Header.tsx          # Header component
│   │   ├── Hero.tsx            # Hero section with feature grid
│   │   └── InfoSection.tsx     # Getting started section
│   ├── App.css                 # App styles
│   ├── App.tsx                 # Root component
│   ├── index.css               # Global styles
│   ├── main.tsx                # Entry point
│   └── vite-env.d.ts           # Vite type declarations
├── index.html                  # HTML template (Vite entry)
├── tsconfig.json               # TypeScript configuration
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and scripts
├── aws-setup.md                # Detailed AWS setup guide
└── README.md
```

## Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Deploy to AWS S3

1. **Set up AWS** — Follow [`aws-setup.md`](./aws-setup.md)
2. **Add GitHub Secrets:**
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `S3_BUCKET_NAME`
   - `CLOUDFRONT_DISTRIBUTION_ID` (optional)
3. **Push to trigger deployment:**

```bash
git push origin main
```

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every push:

1. Checks out the code
2. Sets up pnpm and Node.js 20
3. Installs dependencies (`pnpm install --frozen-lockfile`)
4. Type-checks and builds (`tsc -b && vite build`)
5. Syncs the `dist/` folder to S3
6. Invalidates CloudFront cache (if configured)

## Scripts

| Command        | Description                          |
|----------------|--------------------------------------|
| `pnpm dev`     | Start Vite dev server                |
| `pnpm build`   | Type-check + build for production    |
| `pnpm preview` | Preview the production build         |

## Tech Stack

- **React 19** — UI library
- **TypeScript 5.7** — Type safety
- **Vite 6** — Build tool and dev server
- **pnpm** — Fast, disk-efficient package manager
- **AWS S3** — Static hosting
- **GitHub Actions** — CI/CD pipeline
- **CloudFront** — CDN (optional)
