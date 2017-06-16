
FROM readytalk/nodejs

# Add our configuration files and scripts
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 8080

ENTRYPOINT ["/nodejs/bin/npm", "start"]