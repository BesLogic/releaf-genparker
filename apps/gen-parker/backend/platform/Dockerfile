FROM node:18-alpine3.15 as build-stage

WORKDIR /usr/src/app

# Adding node_modules
COPY /dist/apps/gen-parker/backend/platform .

CMD ["node", "./main.js"]