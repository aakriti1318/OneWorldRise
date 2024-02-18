const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/', async (req, res, next) => {
    try {
        const newEvent = new Event(req.body); 
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const allEvents = await Event.find({});
        res.json(allEvents);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
