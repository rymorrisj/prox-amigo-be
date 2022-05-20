const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { userSchema } = require('./user.model');

const groupSchema = mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 30,
    },
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    members: {
      type: [userSchema],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
groupSchema.plugin(toJSON);
groupSchema.plugin(paginate);

/**
 * Check if group name is taken
 * @param {string} groupName - The group's email
 * @returns {Promise<boolean>}
 */
groupSchema.statics.isGroupNameTaken = async function (groupName) {
  const group = await this.findOne({ groupName });
  return !!group;
};

/**
 * @typedef Group
 */
const Group = mongoose.model('Group', groupSchema);

module.exports = { Group, groupSchema };
