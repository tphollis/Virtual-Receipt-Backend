const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('Items').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('Items').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createitems = async (req, res) => {
  const contact = {
    Food_Name: req.body.Food_Name,
    Ingredients: req.body.Ingredient,
    calories: req.body.calories,
    Directions: req.body.Direction,
    
  };
  const response = await mongodb.getDb().db().collection('Items').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateitems = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    Food_Name: req.body.Food_Name,
    Ingredients: req.body.Ingredient,
    calories: req.body.calories,
    Directions: req.body.Direction,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('Items')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteitems = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('Items').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createitems,
  updateitems,
  deleteitems
};