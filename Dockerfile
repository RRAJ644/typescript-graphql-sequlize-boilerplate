FROM node:16.15.0 AS base

WORKDIR /opt/app

COPY . ./server

WORKDIR /opt/app/server

RUN npm install
RUN npm install -g sequelize-cli
RUN npm run build

# --- Release with Alpine ----
FROM node:16.15.0 AS release

WORKDIR /home/app

COPY --from=base /opt/app/server .

RUN npm install
RUN npm install -g sequelize-cli

EXPOSE 4000

CMD ["npm", "start"]
