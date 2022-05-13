const express = require('express');
const friendController = require('../../controllers/friend.controller');

const router = express.Router();

router
  .route('/:friendId')
  .get(friendController.findFriend)
  .post(friendController.createFriend)
  .patch(friendController.updateFriend)
  .delete(friendController.deleteFriend);

module.exports = router;