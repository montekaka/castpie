FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV=production
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "node", "server/app.js" ]