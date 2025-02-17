const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  code: String,
  name: String,
  address: String,
  city: String,
  zip: String,
  country: String,
  checkin: Date,
  checkout: Date,
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);