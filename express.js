require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Models
const Event = require('./models/Event');
const Blog = require('./models/Blog');

const app = express();

// Middleware
app.use(express.json()); // bodyParser.json() is deprecated
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API Endpoints

// Fetch Trending Events and Blogs Based on Country
app.get('/api/trending/:country', async (req, res) => {
  const { country } = req.params;
  try {
    const events = await Event.find({ country }).sort({ interestedCount: -1 }).limit(5);
    const blogs = await Blog.find({ country }).sort({ createdAt: -1 }).limit(5);
    res.json({ events, blogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a New Event
app.post('/api/events', async (req, res) => {
  const { name, organizer, location, country, date, time, purpose, tags } = req.body;
  try {
    const newEvent = new Event({ name, organizer, location, country, date, time, purpose, tags, interestedCount: 0 }); 
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
  
// Update Event's Interested Count
app.patch('/api/events/interest/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (event) {
      event.interestedCount += 1;
      await event.save();
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a New Blog
app.post('/api/blogs', async (req, res) => {
  const { title, content, country } = req.body;
  try {
    const newBlog = new Blog({ title, content, country });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ongoing Events and Blogs Listing with Filtering
app.get('/api/events', async (req, res) => {
  const { country, sort = 'date', limit = 10 } = req.query;
  try {
    const queryOptions = country ? { country } : {};
    const events = await Event.find(queryOptions).sort({ [sort]: -1 }).limit(+limit);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/blogs', async (req, res) => {
  const { country, sort = 'createdAt', limit = 10 } = req.query;
  try {
    const queryOptions = country ? { country } : {};
    const blogs = await Blog.find(queryOptions).sort({ [sort]: -1 }).limit(+limit);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/events/ongoing', async (req, res) => {
    const currentDate = new Date();
    try {
      const ongoingEvents = await Event.find({ date: { $gte: currentDate } })
                                        .sort({ date: 1 }) // Sort by upcoming dates
                                        .limit(10); // Limit the number of events fetched, adjust as needed
      res.json(ongoingEvents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.get('/api/blogs/latest', async (req, res) => {
    try {
      const latestBlogs = await Blog.find({})
                                    .sort({ createdAt: -1 }) // Sort by creation date, newest first
                                    .limit(10); // Limit the number of blogs fetched
      res.json(latestBlogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// Define a port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
