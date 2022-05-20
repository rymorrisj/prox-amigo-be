const httpStatus = require('http-status');
const { Group } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} groupBody
 * @returns {Promise<Group>}
 */
const createGroup = async (groupBody) => {
  if (await Group.isGroupNameTaken(groupBody.groupName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Group name is already taken');
  }
  return Group.create(groupBody);
};

/**
 * Get group by id
 * @param {ObjectId} id
 * @returns {Promise<Group>}
 */
const getGroupById = async (id) => {
  return Group.findById(id);
};

/**
 * Get group by name
 * @param {string} name
 * @returns {Promise<Group>}
 */
const getGroupByName = async (name) => {
  return Group.findOne({ name });
};

/**
 * Get all groups by user id
 * @param {ObjectId} userId
 * @returns {Promise<Group>}
 */
const getAllUserCreatedGroups = async (userId) => {
  return Group.find({ creator: userId });
};

/**
 * Update group by id
 * @param {ObjectId} groupId
 * @param {Object} updateBody
 * @returns {Promise<Group>}
 */
const updateGroupById = async (groupId, updateBody) => {
  const group = await getgroupById(groupId);
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
  }
  if (updateBody.groupName && (await Group.isGroupNameTaken(updateBody.groupName, groupId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Group name already taken');
  }
  Object.assign(group, updateBody);
  await Group.save();
  return group;
};

/**
 * Delete group by id
 * @param {ObjectId} groupId
 * @returns {Promise<Group>}
 */
const deleteGroupById = async (groupId) => {
  const group = await getGroupById(groupId);
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
  }
  await Group.remove();
  return group;
};

module.exports = {
  createGroup,
  getGroupById,
  getGroupByName,
  getAllUserCreatedGroups,
  updateGroupById,
  deleteGroupById,
};
