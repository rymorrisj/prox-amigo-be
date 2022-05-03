const httpStatus = require('http-status');
const { Friend } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Friend
 * @param {Object} friendBody
 * @returns {Promise<Friend>}
 */
const createFriend = async (friendBody) => {
  if (await Friend.isEmailTaken(friendBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Friend.create(friendBody);
};

/**
 * Query for friends
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFriends = async (filter, options) => {
  const friends = await Friend.paginate(filter, options);
  return friends;
};

/**
 * Get Friend by id
 * @param {ObjectId} id
 * @returns {Promise<Friend>}
 */
const getFriendById = async (id) => {
  return Friend.findById(id);
};

/**
 * Get Friend by email
 * @param {string} email
 * @returns {Promise<Friend>}
 */
const getFriendByEmail = async (email) => {
  return Friend.findOne({ email });
};

/**
 * Update Friend by id
 * @param {ObjectId} friendId
 * @param {Object} updateBody
 * @returns {Promise<Friend>}
 */
const updateFriendById = async (friendId, updateBody) => {
  const friend = await getFriendById(friendId);
  if (!friend) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Friend not found');
  }
  if (updateBody.email && (await friend.isEmailTaken(updateBody.email, friendId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(friend, updateBody);
  await friend.save();
  return friend;
};

/**
 * Delete friend by id
 * @param {ObjectId} friendId
 * @returns {Promise<Friend>}
 */
const deleteFriendById = async (friendId) => {
  const friend = await getFriendById(friendId);
  if (!friend) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Friend not found');
  }
  await friend.remove();
  return friend;
};

module.exports = {
  createFriend,
  queryFriends,
  getFriendById,
  getFriendByEmail,
  updateFriendById,
  deleteFriendById,
};