require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const eventsRoutes = require('./routes/events'); 
const blogsRoutes = require('./routes/blogs'); 

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//const uri = process.env.DB_URI;

//mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const uri = process.env.DB_URI;
//const username=process.env.MONGODB_USERNAME;
//const password=process.env.MONGODB_PASSWORD;
const mongoDBUrl = 'mongodb+srv://ankitkr62042:ankitkr@cluster0.ilsgxpf.mongodb.net/OneWorldRise';

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event handling for successful connection
db.once('open', () => {
    console.log('Connected to MongoDB database');
});

// Event handling for connection errors
db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

// // MongoDB Connection
// mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// Use Routes
app.use('/api/events', eventsRoutes);
app.use('/api/blogs', blogsRoutes);
// Serve static files from the 'OneWorldRise/Frontend' directory
app.use(express.static(path.join(__dirname, 'OneWorldRise/Frontend')));

// Route for the root URL
app.get('/', (req, res) => {
  // Since we're using express.static, this route will only be reached if there's no matching static file
  res.status(404).send('Page not found');
});


// Example of a simple static file serving setup, adjust as necessary for your project
app.use(express.static('public'));

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Something broke!');
});

// Define a port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
