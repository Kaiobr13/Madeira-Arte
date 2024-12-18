FROM node:lts-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json package.json
COPY . .
RUN npm install --production --silent && mv node_modules ../
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
