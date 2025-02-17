const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  number: String,
  capacity: String,
  floor: String,
  room_image: String,
  price: String,
  wifi: Boolean,
  parking: Boolean,
  breakfast: Boolean,
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
});

module.exports = mongoose.model('Room', roomSchema);