require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');


mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].host}"`);
  })
  .catch((err) => {
    throw new Error(err, 'Error connecting to mongo');
  });

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// default value for title local
app.locals.title = 'Catwakl - Back-end test';

const index = require('./routes/index');

app.use('/', index);

module.exports = app;
