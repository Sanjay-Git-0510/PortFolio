# ---------- Build stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source and build
COPY . .

# Build the TanStack Start app as a Node server (nitro node-server preset)
ENV NITRO_PRESET=node-server
RUN npm run build

# ---------- Runtime stage ----------
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Only the built output is needed at runtime
COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
