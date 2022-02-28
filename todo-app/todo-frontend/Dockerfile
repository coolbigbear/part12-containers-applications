FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3001

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]