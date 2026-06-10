// PM2 ecosystem. Start: pm2 start config.cjs
// Build first (with node 20): nvm use 20 && (cd backend && npm run build) && (cd frontend && npm run build)
// Forces node 20 via NODE_20 interpreter regardless of nvm default.
const NODE_20 = "/root/.nvm/versions/node/v20.20.2/bin/node";

module.exports = {
  apps: [
    {
      name: "shop-backend",
      cwd: "./backend",
      script: "./node_modules/@strapi/strapi/bin/strapi.js",
      args: "start",
      interpreter: NODE_20,
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: "1337",
      },
      max_memory_restart: "1G",
      time: true,
    },
    {
      name: "shop-frontend",
      cwd: "./frontend",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      interpreter: NODE_20,
      env: {
        NODE_ENV: "production",
        PORT: "4000",
      },
      max_memory_restart: "1G",
      time: true,
    },
  ],
};
