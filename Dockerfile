# Tahap 1: Base image
FROM node:18-alpine AS base

# Install dependencies untuk kompatibilitas
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Instal turbo secara global
RUN npm install -g turbo

# Salin file konfigurasi utama
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps/isomorphic/package.json ./apps/isomorphic/

# Instal dependensi dengan pnpm
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Tahap 2: Builder
FROM base AS builder
WORKDIR /app

# Salin seluruh kode proyek
COPY . .

# Build aplikasi Next.js dengan filter "iso"
RUN pnpm turbo run build --filter=iso

# Tahap 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Tambahkan user non-root untuk keamanan
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Salin output standalone dari aplikasi Next.js
COPY --from=builder --chown=nextjs:nodejs /app/apps/isomorphic/.next/standalone ./apps/isomorphic/
COPY --from=builder --chown=nextjs:nodejs /app/apps/isomorphic/.next/static ./apps/isomorphic/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/isomorphic/public ./apps/isomorphic/public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "apps/isomorphic/server.js"]