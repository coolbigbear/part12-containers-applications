FROM node:16

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]