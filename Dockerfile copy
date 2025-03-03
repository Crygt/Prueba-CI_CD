# Usa la imagen oficial de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Exponer el puerto en el que corre la API
EXPOSE 3001

# Comando para iniciar la API con npm
CMD ["npm", "start"]
