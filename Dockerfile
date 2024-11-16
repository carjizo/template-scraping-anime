#build stage
FROM node:alpine AS build-stage
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#production stage
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /usr/src/app/dist/mi-app/browser /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]