# Use Node.js LTS (Latest)
FROM node:latest

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

