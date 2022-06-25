const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const { validationResult } = require('express-validator');

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
};

const deleteUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('users').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'There was an error when deleting the user.');
    }
  };