const app = require('./app');
const config = require('../configs/config');
const logger = require('../configs/logger');
const db = require('../database/db')
const friendModel = require('../database/models/friend.model');

let server;
server = app.listen(config.serverPort, async () => {
    // Start db here
    await db.ensureSchema();

    await friendModel.createFriend({
      username: 'test',
      password: 'test',
      latitude: 'test',
      longitude: 'test',
      cityState: 'test' ,
    }).then((resp) => logger.info('user created' + '************* \n' + resp))

    await friendModel.findFriend(1).then((resp) => logger.info('user found' + '************* \n' + JSON.stringify(resp)))
    
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