# Use Node 20 LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose Next.js port
EXPOSE 3000

# Start app
CMD ["npm", "run", "dev"]
