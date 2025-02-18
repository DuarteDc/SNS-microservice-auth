# Etapa base
FROM node:alpine3.20 as base
WORKDIR /app
COPY . .  


FROM base AS test
RUN npm install
RUN npm run test


FROM base as builder
WORKDIR /app
RUN npm install
RUN npm run build

FROM node:alpine3.20 as prod
WORKDIR /app

COPY --from=base /app/.env /app/.env
COPY --from=base /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist/ /app/

EXPOSE 3000

CMD [ "node", "src/app.js" ]
