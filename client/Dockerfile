FROM node:14

LABEL version="1.0"
LABEL description="This is the base docker image for the frontend react app."
LABEL maintainer = ["dopazo178@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]