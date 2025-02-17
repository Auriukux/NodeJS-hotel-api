const express = require('express');
const app = express();
const roomRoutes = require('./src/routes/roomRoute');
const reservationRoutes = require('./src/routes/reservationRoute');

app.use(express.json());

app.use('/module-b/api/v1/rooms', roomRoutes);
app.use('/module-b/api/v1/reservations', reservationRoutes);

module.exports = app;