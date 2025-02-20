# Use an official Node.js runtime as a parent image
FROM node:16-alpine3.11

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the application will run
EXPOSE 30001

# Start the application
CMD ["npm", "start"]

