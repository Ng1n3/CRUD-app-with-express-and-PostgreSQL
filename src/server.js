const { startServer, app } = require('./app');

if (require.main === module) {
  startServer(app).catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
  });
}
