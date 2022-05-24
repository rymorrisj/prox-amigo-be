const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { User } = require('./user.model');

const groupSchema = mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 30,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    members: {
      type: [{ type: mongoose.ObjectId, ref: User }],
      default: undefined,
      index: true,
      validate(value) {
        if (value.length >= 25) {
          throw new Error('Groups can only have 25 members at a time plus the owner');
        }
      },
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
