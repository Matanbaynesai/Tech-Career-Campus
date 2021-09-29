const eventModel = require("../models/eventModel");
const staffModel = require("../models/staffModel");
const { nullError ,isEmptyId , nullVariable} = require("../utils/Errors");

const getAllEventPost = async (req, res) => {
  try {
    await eventModel.find({}, (error, result) => {
      if (error) throw error;
      nullError(result, res);
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "get event post field",
        error: err.message
      });
  }
};

const getEventById = async (req, res) => {
  try {
    isEmptyId(req.params.id)
    await eventModel.findById(req.params.id, (err, result) => {
      if (err) throw err;
      nullError(result,res);
    });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "get event by id field",
        error: err.message
      });
  }
};

const postNewEvent = async (req, res) => {
  try {
  isEmptyId(req.params.id)  
  const staff = await staffModel.findById(req.params.id);
  nullVariable(staff)
  const { eventName, message } = req.body;
  const newEvent = new eventModel({
    eventName: eventName,
    message: message,
    createBy: `${staff.firstName} ${staff.lastName}`
  });
    await newEvent.save();
    res
      .status(201)
      .json({
        success: true,
        message: "post added successfully, success",
        data: newEvent,
      });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "post added field ",
        error: err.message
      });
  }
};

const deleteEventPost = async (req, res) => {
  try {
    isEmptyId(req.params.id)
    await eventModel.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) throw err;
      nullError(result, res);

    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "deleted event field",
        error: err.message
      });
  }
};

const updateEventPost = async (req, res) => {
  try {
    isEmptyId(req.params.id)
    await eventModel.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true },
      (err, result) => {
        if (err) throw err;
        nullError(result, res);
      }
    );
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "update event field",
        error: err.message
      });
  }
};
module.exports = {
  getAllEventPost,
  getEventById,
  postNewEvent,
  deleteEventPost,
  updateEventPost,
};
