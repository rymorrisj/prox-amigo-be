const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ENVIRONMENTS = Object.freeze({
  dev: 'development',
  production: 'production',
  test: 'test'
});

module.exports = {
  env: ENVIRONMENTS[process.env.NODE_ENV] || 'development',
  webSocketPort: process.env.WSS_PORT,
  serverPort: process.env.SERVER_PORT,
  development: {
		client: 'mysql',
		connection: {
			host: process.env.MYSQL_HOST,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_ROOT_PASSWORD,
      		port: process.env.MYSQL_PORT,
			database: process.env.MYSQL_NAME,
			charset: 'utf8'
		}
	}
};