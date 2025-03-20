# Stage 1: Build Laravel
FROM composer:2.5 AS builder
WORKDIR /app

# Salin file composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Salin seluruh kode Laravel
COPY . .

# (Opsional) Jalankan artisan untuk cache
RUN php artisan config:cache && php artisan route:cache

# Stage 2: Production Image
FROM php:8.1-fpm-alpine
WORKDIR /var/www
RUN apk add --no-cache nginx

COPY --from=builder /app /var/www

EXPOSE 8000
CMD ["php-fpm"]
