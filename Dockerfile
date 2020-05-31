FROM node:12-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN npm run prodbuild

FROM nginx:alpine
COPY --from=build /app/dist/cci /usr/share/nginx/html
EXPOSE 80
