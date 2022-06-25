const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const { validationResult } = require('express-validator');

const createUser = async (req, res) => {
    const user = {
      userame: req.body.username,
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
};

const deleteUser = async (req, res) => {
    const username = new ObjectId(req.params.username);
    const response = await mongodb.getDb().db().collection('user').remove({ username: username }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'There was an error when deleting the user.');
    }
  };

  module.exports = { getSingle, createUser, deleteUser};