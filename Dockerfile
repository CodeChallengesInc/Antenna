FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm install && ng build --prod

FROM nginx:alpine
COPY --from=build /app/dist/cci /usr/share/nginx/html
EXPOSE 80