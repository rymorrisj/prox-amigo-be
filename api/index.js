const app = require('./app');
const config = require('../configs/config');
const logger = require('../configs/logger');
const db = require('../database/db')
const friendModel = require('../database/models/friend.model');

let server;
server = app.listen(config.serverPort, async () => {
  // Drop everything for dev
  // await db.dropAll();  

  // Start db here
  await db.ensureSchema();

  // Testing the DB without endpoints for now
  // await friendModel.createFriend({ username: 'test', password: 'test', latitude: 'test', longitude: 'test', cityState: 'test' });
  // await friendModel.getAllFriends().then(resp => logger.info(JSON.stringify(resp)));
    
  logger.info(`Listening to port ${config.serverPort}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});