# Usa una imagen de node como base
FROM node:18-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos package.json y package-lock.json a la imagen
COPY package*.json ./

# Instala las dependencias
RUN yarn install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Expone el puerto 3000 (o el puerto que uses para npm run dev)
EXPOSE 3003

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]