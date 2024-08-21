FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

EXPOSE 3600

CMD ["node","index.js"]