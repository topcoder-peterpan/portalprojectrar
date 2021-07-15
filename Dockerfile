FROM node:14.16-alpine3.10 as build
RUN apk --update --no-cache add \
  python2 build-base
WORKDIR /front/
COPY . .

RUN echo -e '#!/usr/bin/env sh   \n\
err=$(npm install)               \n\
if [[ "$err" != 0 ]]             \n\
then                             \n\
  npm cache clean --force        \n\
  npm install                    \n\
fi                               \n\
npm run build -- --prod          \n\
' > /front/build.sh
RUN chmod +x /front/build.sh && /front/build.sh

FROM nginx:1.21 as nginx
WORKDIR /usr/share/nginx/html/
COPY .k8s/default.conf /etc/nginx/conf.d/
COPY --from=build /front/build/ .
