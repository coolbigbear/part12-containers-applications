FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

ENV REACT_APP_BACKEND_URL=http://localhost:3001

# npm start is the command to start the application in development mode
CMD ["npm", "start"]