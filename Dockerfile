FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist/cci /usr/share/nginx/html
EXPOSE 80