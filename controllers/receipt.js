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
  const userId = req.params.usrId;
  let result;
  if (field == "date"){
    result = await mongodb.getDb().db().collection('receipt').find({user_id:userId, date: new Date(value)});
  } else if (field == "total"){
    result = await mongodb.getDb().db().collection('receipt').find({user_id:userId, total:{
      $gte: parseInt(value),
      $lt: parseInt(value)+.99
    }
  });
  } else if (field == "store"){
    result = await mongodb.getDb().db().collection('receipt').find({user_id:userId, store: value});
  } else if (field == "city"){
    result = await mongodb.getDb().db().collection('receipt').find({user_id:userId, city: value});
  } else if (field == "state"){
    result = await mongodb.getDb().db().collection('receipt').find({user_id:userId, state: value});
  } else if (field == "purchase_type"){
    result = await mongodb.getDb().db().collection('receipt').find({user_id:userId, purchase_type: value});
  } else if (field == "_id" || field == "id"){
    result = await mongodb.getDb().db().collection('receipt').find({_id:value});
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
  const userId = req.params.usrId;
  const result = await mongodb.getDb().db().collection('receipt').find({user_id:userId, 
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

const updateReceipt = async (req, res) => {
  const recptId = new ObjectId(req.params.id);

  const receipt = {
    user_id: req.body.user_id,
    date: new Date(req.body.date),
    total: Number(req.body.total),
    store: req.body.store,
    city: req.body.city,
    state: req.body.state,
    purchase_type: req.body.purchase_type,
    image: req.body.image
  };
  const response = await mongodb.getDb().db().collection('receipt').replaceOne({ _id: recptId }, receipt);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'There was an error when updating the receipt.');
  }
};

const createReceipt = async (req, res) => {
  const receipt = {
    user_id: req.body.user_id,
    date: new Date(req.body.date),
    total: Number(req.body.total),
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

module.exports = { getAll, getSpecific, getTimeRange, createReceipt, deleteReceipt, updateReceipt};