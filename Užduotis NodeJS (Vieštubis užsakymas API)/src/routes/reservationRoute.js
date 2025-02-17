const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Maršrutai rezervacijoms
router.route('/')
  .post(reservationController.getAllReservations);
router.route('/:id/reservation')
  .post(reservationController.createReservationForRoom);
router.route('/:id/cancel')
  .post(reservationController.cancelReservation);

module.exports = router;