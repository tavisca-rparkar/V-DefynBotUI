FROM node:alpine AS builder

WORKDIR /app

COPY ./dist/ /app

FROM nginx:alpine

COPY --from=builder /app/ConciergeBookingApp/* /usr/share/nginx/html/