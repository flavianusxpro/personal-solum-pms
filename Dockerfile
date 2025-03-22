# Stage 1: Base image
FROM node:18-alpine AS base

# Install dependencies for compatibility
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install turbo globally
RUN npm install -g turbo

# Copy main configuration files
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps/isomorphic/package.json ./apps/isomorphic/

# Install dependencies with pnpm
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Install dependencies for the "isomorphic" app specifically
WORKDIR /app/apps/isomorphic
RUN pnpm install --no-frozen-lockfile

# Stage 2: Builder
FROM base AS builder
WORKDIR /app

# Copy entire project code
COPY . .

# Build the Next.js app with the "iso" filter
RUN pnpm turbo run build --filter=iso

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy output from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/apps/isomorphic/.next/standalone ./apps/isomorphic/
COPY --from=builder --chown=nextjs:nodejs /app/apps/isomorphic/.next/static ./apps/isomorphic/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/isomorphic/public ./apps/isomorphic/public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expose the port
EXPOSE 3000

# Run the app
CMD ["node", "apps/isomorphic/server.js"]
