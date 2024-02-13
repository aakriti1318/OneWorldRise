const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); 
s
// Fetch Trending Events Based on Country
router.get('/trending/:country', async (req, res, next) => {
  const { country } = req.params;
  try {
    const events = await Event.find({ country }).sort({ interestedCount: -1 }).limit(5);
    res.json(events);
  } catch (err) {
    next(err);
  }
});

// Create a New Event
router.post('/', async (req, res, next) => {
  try {
    const newEvent = new Event(req.body); 
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    next(err);
  }
});

// Update Event's Interested Count
router.patch('/interest/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (event) {
      event.interestedCount += 1;
      await event.save();
      res.json(event);
    } else {
      res.status(404).send('Event not found');
    }
  } catch (err) {
    next(err);
  }
});

// Fetch Ongoing Events
router.get('/ongoing', async (req, res, next) => {
  const currentDate = new Date();
  try {
    const ongoingEvents = await Event.find({ date: { $gte: currentDate } })
      .sort({ date: 1 })
      .limit(10);
    res.json(ongoingEvents);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
