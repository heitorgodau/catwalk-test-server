const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json('API is working');
});


// SEARCH all events
router.get('/events', async (req, res) => {
  try {
    const result = await Event.find();
    res.status(200).json(result);
  } catch (err) {
    throw new Error(err);
  }
});

// SEARCH a specific event
router.get('/event/:eventId', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    res.status(400).json({ message: 'Specified ID is not valid' });
    return;
  }
  const { eventId } = req.params;
  try {
    const result = await Event.findById(eventId);
    res.status(200).json(result);
  } catch (err) {
    throw new Error(err);
  }
});

// EDIT a specific event
router.put('/event/:eventId', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    res.status(400).json({ message: 'Specified ID is not valid' });
    return;
  }
  const { eventId } = req.params;
  try {
    await Event.findByIdAndUpdate(eventId, req.body);
    res.json({ message: `Event with ${req.params.id} ID is updated successfully.` });
  } catch (err) {
    throw new Error(err);
  }
});

// CREATE a new event
router.post('/create-event', async (req, res) => {
  if (!req.body.imageUrl) req.body.imageUrl = 'https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg';
  try {
    const result = await Event.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    throw new Error(error);
  }
});


// DELETE a specific event
router.get('/event/delete/:eventId', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    res.status(400).json({ message: 'Specified ID is not valid' });
    return;
  }
  const { eventId } = req.params;
  try {
    await Event.findByIdAndDelete(eventId)
    res.json({ message: `Event with ${req.params.eventId} ID is delete successfully.` });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
