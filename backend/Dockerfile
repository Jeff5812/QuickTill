FROM node:22-alpine
WORKDIR /app

# Copy package files first so dependency installs are cached
COPY package*.json ./
RUN npm ci --omit=dev

# Then copy the rest of the code
COPY . .

ENV PORT=5000
EXPOSE 5000

# Docker will mark the container unhealthy if /health stops responding
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5000/health || exit 1

CMD ["node", "server.js"]