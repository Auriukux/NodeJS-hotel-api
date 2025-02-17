const { body } = require('express-validator');

const validateReservation = [
  body('name').notEmpty().withMessage('The name field is required.'),
  body('address').notEmpty().withMessage('The address field is required.'),
  body('city').notEmpty().withMessage('The city field is required.'),
  body('zip').notEmpty().withMessage('The zip field is required.'),
  body('country').notEmpty().withMessage('The country field is required.'),
  body('checkin').isISO8601().withMessage('Checkin date must be a valid date.'),
  body('checkout').isISO8601().withMessage('Checkout date must be a valid date.'),
];

module.exports = {
  validateReservation
};