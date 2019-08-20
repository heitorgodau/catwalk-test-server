const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  name: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  imageUrl: { type: String, default: 'https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg' },
  address: String,
  description: String,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
