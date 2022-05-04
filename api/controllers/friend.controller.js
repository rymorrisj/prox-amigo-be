const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { friendService } = require('../services');

const createFriend = catchAsync(async (req, res) => {
  const friend = await friendService.createFriend(req.body);
  res.status(httpStatus.CREATED).send(friend);
});

const findFriend = catchAsync(async (req, res) => {
  const username = pick(req.query, ['username']);
  const result = await friendService.findFriend(username);
  res.send(result);
});

const updateFriend = catchAsync(async (req, res) => {
  const friend = await friendService.updateFriendById(req.params.friendId, req.body);
  res.send(friend);
});

const deleteFriend = catchAsync(async (req, res) => {
  await friendService.deleteFriendById(req.params.friendId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFriend,
  findFriend,
  updateFriend,
  deleteFriend,
};