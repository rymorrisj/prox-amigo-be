const express = require('express');
const friendController = require('../../controllers/friend.controller');

const router = express.Router();

router
  .route('/')
  .post(friendController.createFriend)
  .get(friendController.getFriend);

router
  .route('/:friendId')
  .get(friendController.getFriend)
  .patch(friendController.updateFriend)
  .delete(friendController.deleteFriend);

module.exports = router;