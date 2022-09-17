FROM node:18-alpine3.15

WORKDIR /crunchbinge
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build

CMD ["npm","start"]

