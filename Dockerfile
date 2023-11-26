FROM node as build

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

CMD [ "npm", "run", "build" ]

EXPOSE 8080