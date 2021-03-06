const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      privelage: req.body.privelage
    };
    const response = await mongodb.getDb().db().collection('user').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'There was an error when creating the user.');
    }
  };

const getSingle = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('user').find({username: req.params.usrname});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('user').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'There was an error when deleting the user.');
  }
};

  module.exports = { getSingle, createUser, deleteUser};