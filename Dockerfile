# Base image
FROM nginx:alpine

# Add metadata
LABEL maintainer="Harshida Joshi"
LABEL description="Static Developer Portfolio"

# Copy static website files to Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
