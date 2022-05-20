const allRoles = {
  user: ['manageGroup'],
  admin: ['getUsers', 'manageUsers', 'getGroups'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
