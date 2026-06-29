# BU Techno

BU Techno est une application SaaS professionnelle pour intégrateurs en sécurité électronique. Le Sprint 1 livre le socle production : Next.js 15, React 19, TypeScript, Tailwind CSS, composants shadcn/ui, Prisma, PostgreSQL, Auth.js, React Hook Form, Zod, Docker et préparation Google Maps API.

## Architecture

```txt
apps/web
├── app/                  # App Router Next.js 15
├── components/           # Layout et composants UI inspirés shadcn/ui
├── lib/                  # Prisma client et utilitaires
├── prisma/schema.prisma  # Modèles métier et tables Auth.js
├── auth.ts               # Configuration Auth.js
└── Dockerfile            # Image de production
```

## Modèles Sprint 1

- `User` avec rôle (`ADMIN`, `MANAGER`, `INTEGRATOR`, `VIEWER`) et compatibilité Auth.js.
- `Client` pour le portefeuille client.
- `Site` avec adresse et coordonnées latitude/longitude pour Google Maps.
- `Project` avec statut projet et relations client/site/responsable.

## Démarrage local

```bash
cp apps/web/.env.example apps/web/.env
npm install
docker compose up -d postgres
npm run db:generate
npm run db:migrate
npm run dev
```

Application : <http://localhost:3000>

## Variables d'environnement

Voir `apps/web/.env.example` pour `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL` et `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

## Production

```bash
docker compose build web
docker compose up -d
```

Avant la mise en production, remplacer `AUTH_SECRET`, sécuriser les mots de passe PostgreSQL et configurer une clé Google Maps restreinte par domaine.

## Tests automatisés

Le Sprint 2 introduit Vitest pour sécuriser les modules critiques dès le début du projet.

```bash
npm run test -w @bu-techno/web
npm run test:coverage -w @bu-techno/web
```

Les premiers tests couvrent les schémas Zod, les helpers d’authentification API, les contrats des API principales et les routes REST projets.
