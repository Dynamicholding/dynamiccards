module.exports = {
  apps: [
    {
      name: 'DyCardsApi',
      script: './app.js', // o app.js según tu estructura
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        MAINTENANCE_MODE: 'false',
      },
    },
  ],
};
