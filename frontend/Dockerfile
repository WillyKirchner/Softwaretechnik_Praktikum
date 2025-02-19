# Basis-Image für Node.js
FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# Abhängigkeiten installieren
COPY package.json package-lock.json ./
RUN npm install

# Projektdateien kopieren
COPY . .

# React App bauen
RUN npm run build

# Start der App
CMD ["npm", "start"]
