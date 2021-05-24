FROM node:12-alpine

WORKDIR /app

COPY ./ ./
RUN npm install --loglevel=error
RUN cd modules/MMM-Jast && npm install --loglevel=error

EXPOSE 8080
CMD ["npm", "run", "server"]
