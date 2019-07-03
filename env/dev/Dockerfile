FROM node:6.9

MAINTAINER Mai

ADD ./package.json /src/package.json
WORKDIR /src

RUN cd /src && npm install --production

ADD ./forks/hapi-swagger/index.html /src/node_modules/hapi-swagger/public/swaggerui/index.html

ADD . /src
COPY ./env/dev/manifest.js /src/manifest.js
COPY ./env/dev/.env /src/.env

COPY ./server.js /src/server.js
COPY ./env/dev/package.json /src/package.json
# RUN rm -rf /src/env
# RUN rm -rf /src/forks

EXPOSE 3000

CMD ["npm", "run", "docker"]