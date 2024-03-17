/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        BACK_URL: process.env.BACK_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        YANDEX_CLIENT_ID: process.env.YANDEX_CLIENT_ID,
        YANDEX_CLIENT_SECRET: process.env.YANDEX_CLIENT_SECRET,
    },
};

export default nextConfig;
