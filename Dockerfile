FROM node:latest

WORKDIR /user/app

RUN apt-get update && apt-get upgrade

COPY package.json ./
COPY . .

RUN npm install

EXPOSE 3030

CMD ["npm", "run", "serve"]