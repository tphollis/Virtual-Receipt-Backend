const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const usrId = new ObjectId(req.params.usrId);
  const result = await mongodb.getDb().db().collection('receipt').find({user_id: req.params.usrId});
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
};

const getTimeRange = async (req, res, next) => {
};

const createReceipt = async (req, res) => {
  const receipt = {
    user_id: req.body.usrId,
    date: req.body.date,
    total: req.body.total,
    store: req.body.store,
    city: req.body.city,
    state: req.body.state,
    purchase_type: req.body.purchase_type,
    image: req.body.image
  };
  const response = await mongodb.getDb().db().collection('receipt').insertOne(receipt);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'There was an error when creating the user.');
  }
};

const deleteReceipt = async (req, res) => {
  const receiptId = new ObjectId(req.params.recptId);
  const response = await mongodb.getDb().db().collection('receipt').remove({ _id: receiptId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'There was an error when deleting the contact.');
  }
};

module.exports = { getAll, getSingle, getTimeRange, createReceipt, deleteReceipt};