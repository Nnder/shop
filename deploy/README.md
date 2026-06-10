# Деплой (185.75.189.69, /root/shop)

Процессы — PM2 (`ecosystem.config.js` в корне репо): `shop-backend` (Strapi, :1337),
`shop-frontend` (Next, :4000). Nginx — `/etc/nginx/sites-available/minicrm`:
Strapi публично на `https://strapi.neo-crm.ru`, магазин на `https://meatshop.neo-crm.ru`.

## frontend/.env на сервере (production)

```env
API_URL=https://strapi.neo-crm.ru/api
BACK_URL=https://strapi.neo-crm.ru
NEXTAUTH_URL=https://meatshop.neo-crm.ru
```

`API_URL`/`BACK_URL` зашиваются в клиентский бандл на этапе `npm run build`,
поэтому `localhost` в production ломает все запросы из браузера.
После изменения `.env` фронтенд нужно **пересобрать**, не только перезапустить.

## Nginx

Блок `meatshop.neo-crm.ru` — см. `deploy/nginx-meatshop.conf`.
В нём не должно быть `location /api/ { proxy_pass strapi }`: под `/api/`
работают роуты самого Next (NextAuth и др.).

## Обновление фронтенда

```bash
cd /root/shop && git pull
cd frontend && npm run build   # node 20
pm2 restart shop-frontend
nginx -t && systemctl reload nginx   # если менялся конфиг nginx
```
