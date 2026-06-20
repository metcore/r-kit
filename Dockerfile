FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build:docs
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist-docs", "-l", "3000"]
