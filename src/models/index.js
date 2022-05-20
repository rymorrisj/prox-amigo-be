const { User } = require('./user.model');
const { Group } = require('./group.model');

module.exports.Token = require('./token.model');
module.exports.User = User;
module.exports.Group = Group;
