# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install 'serve' to serve the build directory
RUN npm install -g serve

# Use 'serve' to serve the build directory
CMD ["serve", "-s", "build"]

# Expose port 80
EXPOSE 80
