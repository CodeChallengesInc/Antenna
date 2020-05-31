FROM node:12-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN npm run prodbuild

FROM nginx:alpine
COPY --from=build /app/dist/cci /usr/share/nginx/html
RUN ls /usr/share/nginx/html
# TODO: Substitute into assets/config.prod.json (not sure what the exact command is)
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/config.prod.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
