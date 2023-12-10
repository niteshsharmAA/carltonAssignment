// routes.js
const express = require('express');
const router = express.Router();
const { CarType, Vehicle, Booking } = require('../model');
const { Op } = require('sequelize');

// Get available bikes and cars
router.get('/api/available-vehicles', async (req, res) => {
  try {
    const availableVehicles = await Vehicle.findAll({
      where: {
        id: {
          [Op.notIn]: await getRentedVehicleIds(),
        },
      },
    });
    res.json(availableVehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Book a vehicle
router.post('/api/bookings', async (req, res) => {
  try {
    const { vehicleId, bookingStartTime, bookingEndTime } = req.body;

    // Check for overlapping bookings
    const existingBooking = await Booking.findOne({
      where: {
        VehicleId: vehicleId,
        [Op.or]: [
          { startTime: { [Op.between]: [bookingStartTime, bookingEndTime] } },
          { endTime: { [Op.between]: [bookingStartTime, bookingEndTime] } },
        ],
      },
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Booking overlaps with an existing booking' });
    }

    // Create a new booking
    const newBooking = await Booking.create({
      VehicleId: vehicleId,
      startTime: bookingStartTime,
      endTime: bookingEndTime,
    });

    res.json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getRentedVehicleIds = async () => {
  const rentedBookings = await Booking.findAll({
    where: {
      endTime: {
        [Op.gt]: new Date(),
      },
    },
    attributes: ['VehicleId'],
    raw: true,
  });

  return rentedBookings.map((booking) => booking.VehicleId);
};

module.exports = router;
