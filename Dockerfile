FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN NITRO_PRESET=node-server npm run build

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

COPY --from=build /app/.output ./.output

RUN chown -R node:node /app
USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]