FROM node:20.11.1

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el esquema de Prisma y ejecutar el comando generate
COPY prisma ./prisma/
RUN npx prisma generate

# Copiar el resto de los archivos de la aplicación
COPY . .

# Definir la variable de entorno
ENV DATABASE_URL="sqlserver://VMWBI\EUROBI;database=EUROAUTH;integratedSecurity=false;username=User_Auth;password=7gTYHwg5Ja6T;trustServerCertificate=true;"

# Exponer el puerto
EXPOSE 15555

# Comando para iniciar la aplicación
CMD ["npm", "start"]
