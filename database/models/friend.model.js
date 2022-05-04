const db = require('../db');
const validator = require('validatorjs');

const _isEmailValid = email => {
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
    }
}

const _isEmailTaken = async email => await db('Friends')
    .where({ email })
    .then((resp) => !!resp);

const createFriend = attr => {
	return new Promise((resolve, reject) => {
        // if (_isEmailTaken(attr.email)) reject('Email is taken');
        // if (_isEmailValid(attr.email)) reject('Email is invalid');

		db('Friends')
            .insert(attr)
			.then(result => resolve(result))
            .catch(error => reject(error))
    });
};

const findFriend = id => {
	return db('Friends')
        .where({ id })
        .limit(1)
		.then(rows => rows[0]);
};

const updateFriend = attr => {
	return new Promise((resolve, reject) => {
        // if (_isEmailTaken(attr.email)) reject('Email is taken');
        // if (_isEmailValid(attr.email)) reject('Email is invalid');

		db('Friends')
            .where({ id: attr.id })
            .update(attr)
            .then(result => resolve(result))
            .catch(error => reject(error))
    });
}

const deleteFriend = id => {
	return db('Friends')
        .where({ id })
        .del()
		.then(response => response)
}

module.exports = {
    createFriend,
    findFriend,
    updateFriend,
    deleteFriend,
};