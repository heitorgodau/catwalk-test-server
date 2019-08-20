require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');


mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].host}"`);
  })
  .catch((err) => {
    throw new Error(err, 'Error connecting to mongo');
  });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// default value for title local
app.locals.title = 'Catwakl - Back-end test';

app.use(cors({
  credentials: true,
  origin: ['http://localhost:1234', 'http://localhost:3000', 'http://localhost:8080'],
}));

const index = require('./routes/index');

app.use('/api', index);

module.exports = app;
