const Reservation = require('../models/reservationModel');
const Room = require('../models/roomModel');
const { validationResult } = require('express-validator');
const { validateReservation } = require('../utils/validators');
const { generateRandomCode } = require('../utils/generateCode');

// Sukurti kambario rezervaciją
exports.createReservationForRoom = [
  validateReservation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }
    try {
      const roomId = req.params.id;
      const { name, address, city, zip, country, checkin, checkout } = req.body;
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ status: 'fail', message: 'A room with this ID does not exist' });
      }
      const reservationCode = generateRandomCode();
      const newReservation = await Reservation.create({
        code: reservationCode, name, address, city, zip, country, checkin, checkout,
        room: roomId
      });
      room.reservations.push(newReservation._id);
      await room.save();
      res.status(201).json({
        status: 'success',
        data: {
          reservation: newReservation
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  }
];

// Gauti visas rezervacijas
exports.getAllReservations = async (req, res) => {
  try {
    const { code, name } = req.body;
    if (!code || !name) {
      return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    }
    const reservations = await Reservation.find({ name: name, code: code });
    if (reservations.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'No reservations found for the provided name and code' });
    }
    res.status(200).json({
      status: 'success',
      data: {
        reservations
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Atšaukti rezervaciją
exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name } = req.body;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ status: 'fail', message: 'A reservation with this ID does not exist' });
    }
    if (reservation.code !== code || reservation.name !== name) {
      return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    }
    await Reservation.findByIdAndDelete(id);
    res.status(204).json({ status: 'success', message: 'success' });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};