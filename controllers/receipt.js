const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('receipt').find({user_id: req.params.usrId});
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSpecific = async (req, res, next) => {
  const field = req.params.field;
  const value = req.params.value;
  let result;
  if (field == "date"){
    result = await mongodb.getDb().db().collection('receipt').find({date: new Date(value)});
  } else if (field == "total"){
    result = await mongodb.getDb().db().collection('receipt').find({total: value});
  } else if (field == "store"){
    result = await mongodb.getDb().db().collection('receipt').find({store: value});
  } else if (field == "city"){
    result = await mongodb.getDb().db().collection('receipt').find({city: value});
  } else if (field == "state"){
    result = await mongodb.getDb().db().collection('receipt').find({state: value});
  } else if (field == "purchase_type"){
    result = await mongodb.getDb().db().collection('receipt').find({purchase_type: value});
  }
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getTimeRange = async (req, res, next) => {
  // const date1 = new ObjectId(req.params.date1);
  // const date2 = new ObjectId(req.params.date2);
  const result = await mongodb.getDb().db().collection('receipt').find({
        date: {
            $gte: new Date(req.params.date1),
            $lt: new Date(req.params.date2)
        }
    });
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createReceipt = async (req, res) => {
  const receipt = {
    user_id: req.body.user_id,
    date: new Date(req.body.date),
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

module.exports = { getAll, getSpecific, getTimeRange, createReceipt, deleteReceipt};