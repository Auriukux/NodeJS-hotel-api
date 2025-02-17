const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const reservationController = require('../controllers/reservationController')

// Maršrutai kambariams
router.route('/')
  .get(roomController.getAllRooms)
router.route('/:id')
  .get(roomController.getRoom);
router.route('/availability/checkin/:checkinDate/checkout/:checkoutDate')
  .get(roomController.checkRoomAvailability);
router.route('/:id/reservation')
  .post(reservationController.createReservationForRoom);
  
module.exports = router;