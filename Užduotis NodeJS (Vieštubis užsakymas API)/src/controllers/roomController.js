const Room = require('../models/roomModel');

// Gauti visus kambarius
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        rooms
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Gauti konkretų kambarį
exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ status: 'fail', message: 'A room with this ID does not exist' });
    }
    res.status(200).json({
      status: 'success',
      data: {
        room
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Patikrinti kambarį užimtumą
exports.checkRoomAvailability = async (req, res) => {
  try {
    const { checkinDate, checkoutDate } = req.params;
    const rooms = await Room.find({
      'reservations.checkin': { $not: { $gte: checkinDate, $lt: checkoutDate } },
      'reservations.checkout': { $not: { $gt: checkinDate, $lte: checkoutDate } }
    });
    res.status(200).json({
      status: 'success',
      data: {
        rooms: rooms.map(room => ({
          id: room._id,
          number: room.number,
          availability: true
        }))
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Bad checkin or checkout date format or date not provided'
    });
  }
};