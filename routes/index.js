const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json('ok');
});


// SEARCH all events
router.get('/events', (req, res) => {
  Event.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
      throw new Error(err);
    });
});

// SEARCH a specific event
router.get('/event/:eventId', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    res.status(400).json({ message: 'Specified ID is not valid' });
    return;
  }
  const { eventId } = req.params;
  Event.findById(eventId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
      throw new Error(err);
    });
});

// EDIT a specific event
router.put('/event/:eventId', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    res.status(400).json({ message: 'Specified ID is not valid' });
    return;
  }
  const { eventId } = req.params;
  Event.findByIdAndUpdate(eventId, req.body)
    .then(() => {
      res.json({ message: `Event with ${req.params.id} ID is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
      throw new Error(err);
    });
});

// CREATE a new event
router.post('/create-event', (req, res) => {
  if (!req.body.imageUrl) req.body.imageUrl = 'https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg';
  Event.create(req.body)
    .then(result => res.status(200).json(result))
    .catch((err) => {
      res.json(err);
      throw new Error(err);
    });
});


// DELETE a specific event
router.get('/event/delete/:eventId', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    res.status(400).json({ message: 'Specified ID is not valid' });
    return;
  }
  const { eventId } = req.params;
  Event.findByIdAndDelete(eventId)
    .then(() => {
      res.json({ message: `Event with ${req.params.eventId} ID is delete successfully.` });
    })
    .catch((err) => {
      res.json(err);
      throw new Error(err);
    });
});

module.exports = router;
