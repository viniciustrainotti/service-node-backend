FROM node:14

MAINTAINER Vinicius Trainotti

WORKDIR /opt/app-root/src

EXPOSE 4000

CMD ["npm", "run", "serve"]