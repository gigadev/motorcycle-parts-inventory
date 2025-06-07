# Stage 1: Build Angular app
FROM node:18 AS build-frontend
WORKDIR /app
COPY . .
RUN npm install && npx ng build --configuration production

# Stage 2: Serve Angular app with NGINX
FROM nginx:alpine AS frontend
COPY --from=build-frontend /app/dist/motorcycle-parts-inventory /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Stage 3: Node.js backend
FROM node:18 AS backend
WORKDIR /app
COPY backend ./backend
COPY database ./database
WORKDIR /app/backend
RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]
