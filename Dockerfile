# Usar imagen base oficial de Node.js
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Crear directorio para la base de datos
RUN mkdir -p /data

# Exponer puerto 3000
EXPOSE 3000

# Variable de entorno para la base de datos
ENV PORT=3000
ENV DB_PATH=/data/incidents.db

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
