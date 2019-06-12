ARG NODE_VERSION=12.4.0-alpine
FROM node:$NODE_VERSION as builder

WORKDIR /build

COPY . /build
RUN set -xe \
    && npm install


FROM node:$NODE_VERSION

ENV SRC_DIR=/data/src

ARG UID=1000
ARG GID=1000

RUN set -xe \
    && if [ ! $(id -u node) = ${UID} ]; then \
         apk --no-cache add shadow; \
         groupmod -g ${GID} node; \
         usermod -u ${UID} node; \
         apk --no-cache del shadow; \
       fi

RUN set -xe \
    && apk --no-cache add su-exec

COPY --chown=node:node --from=builder /build ${SRC_DIR}
WORKDIR ${SRC_DIR}

ENTRYPOINT [ "su-exec", "node" ]
CMD [ "npm", "run", "serve" ]
