# Use lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 8080

# Start app
CMD ["node", "index.js"]