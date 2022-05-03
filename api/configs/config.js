const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  webSocketPort: process.env.WSS_PORT,
  serverPort: process.env.SERVER_PORT,
};