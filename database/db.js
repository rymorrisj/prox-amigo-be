const config = require('../configs/config');
const knex = require('knex')(config.env);
const logger = require('../configs/logger');

const Friends = knex.schema.hasTable('Friends')
    .then(exists => {
        if (!exists) {
            knex.schema.createTable('Friends', (table) => {
                table.increments('id').primary();
                table.string('username', 15);
                table.string('password', 25);
                table.string('latitude', 50);
                table.string('longitude', 50);
                table.string('cityState', 50);
                table.timestamp('created_at').defaultTo(knex.fn.now());
            })
            .then(() => {
                logger.info('Friends Table has been created.');
            });
        }
    });

const Groups = knex.schema.hasTable('Groups')
    .then(exists => {
        if (!exists) {
            knex.schema.createTable('Groups', (table) => {
                table.increments('id').primary();
                table.string('createdBy', 15);
                table.string('groupName', 25);
                table.string('latitude', 50);
                table.string('longitude', 50);
                table.string('cityState', 50);
                table.timestamp('created_at').defaultTo(knex.fn.now());
            })
            .then(() => {
                logger.info('Groups Table has been created.');
            });
        }
    });

const Friends_Groups = knex.schema.hasTable('Friends_Groups')
    .then(exists => {
        if (!exists) {
            knex.schema.createTable('Friends_Groups', (table) => {
                table.increments('id').primary();
                table.string('id_Friends').references('id').inTable('Friends');
                table.string('id_Groups').references('id').inTable('Groups');
            })
            .then(() => {
                logger.info('Friends_Groups join table has been created.');
            });
        }
    });

// The ensureSchema function builds the schema for the db
knex.ensureSchema = async () => {
  return Promise.all([Friends, Groups, Friends_Groups]);
};

module.exports = knex;