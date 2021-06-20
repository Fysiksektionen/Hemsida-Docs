# Pull official base image
FROM node:16-buster

USER root

# Set working directory
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm config set unsafe-perm true

# Install dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent --unsafe-perm=true --allow-root --force

COPY . .

RUN chown node node_modules/ && chgrp node node_modules/

# Start app
CMD ["npm", "start"]