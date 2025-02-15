#COPY DATA TO DOCKER FILE
FROM node:alpine3.20 as base

WORKDIR /app

COPY . .

#RUN TEST 
FROM base AS test
RUN npm i
RUN npm run test

FROM base as builder
WORKDIR /app
RUN npm i --prod-deps  
RUN npm run build 

FROM node:alpine3.20

COPY --from=base /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist/* /app/

EXPOSE 3000

CMD [ "node", "/app.js" ]


