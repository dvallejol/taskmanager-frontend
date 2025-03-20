# Etapa 1: Construcción de la aplicación Angular
FROM node:22 AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build -- --configuration production

# Etapa 2: Servir la aplicación con NGINX
FROM nginx:latest AS production-stage
COPY --from=build-stage /app/dist/doctor-app-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]