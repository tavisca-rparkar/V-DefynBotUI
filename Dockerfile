FROM node:alpine AS builder

WORKDIR /app

COPY ./dist/ /app

FROM nginx:alpine

COPY --from=builder /app/test-project/* /usr/share/nginx/html/