const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createGroup = {
  body: Joi.object().keys({
    groupName: Joi.string().required(),
  }),
};

const getGroups = {
  query: Joi.object().keys({
    groupName: Joi.string(),
    groupId: Joi.required().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getGroup = {
  params: Joi.object().keys({
    groupName: Joi.string(),
    groupId: Joi.string().custom(objectId),
  }),
};

const updateGroup = {
  params: Joi.object().keys({
    groupId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      groupId: Joi.required().custom(objectId),
      groupName: Joi.string().required(),
    })
    .min(1),
};

const deleteGroup = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
};
