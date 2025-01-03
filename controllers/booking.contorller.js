
import {Booking} from '../models/booking.model.js';

export const createBooking = async (req, res) => {
    const { fullName, email, phoneNumber, date, time, guests } = req.body;

    try {
        if (!fullName || !email || !phoneNumber || !date || !time || !guests) {
            return res.status(400).json({
                message: "Please provide all the required fields.",
                success: false,
            });
        }

        // Check if the slot is already booked
        const existingBooking = await Booking.findOne({ date, time });
        if (existingBooking) {
            return res.status(400).json({
                message: "Slot is already taken.",
                success: false,
            });
        }

        // Create a new booking
        const newBooking = new Booking({
            fullName,
            email,
            phoneNumber,
            date,
            time,
            guests,
        });

        await newBooking.save();

        return res.status(201).json({
            message: "Booking created successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

export const getBookings = async (req, res) => {
    const { phoneNumber } = req.params;

    try {
        if (!phoneNumber) {
            return res.status(400).json({
                message: "'phoneNumber' query parameter is required.",
                success: false,
            });
        }

        // Fetch bookings from the database by phone number
        const filteredBookings = await Booking.find({ phoneNumber });

        // Define all available slots
        const allSlots = [
            "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
            "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
            "8:00 PM", "9:00 PM", "10:00 PM"
        ];

        // Remove booked slots from available slots
        const bookedSlotTimes = filteredBookings.map((booking) => booking.time);
        const availableSlots = allSlots.filter((slot) => !bookedSlotTimes.includes(slot));

        return res.status(200).json({
            message: "Bookings fetched successfully.",
            success: true,
            availableSlots: availableSlots.map((time) => ({ time })),
            bookedSlots: filteredBookings.map((booking) => ({
                time: booking.time,
                date: booking.date,
                name: booking.fullName,
                guests : booking.guests,
                email: booking.email,
                phoneNumber: booking.phoneNumber,
            })),
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};


export const deleteBooking = async (req, res) => {
    try {
        const { phoneNumber} = req.body;

        // Find and delete the booking from the database
        const booking = await Booking.findOneAndDelete({
            phoneNumber,
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Booking deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error deleting booking:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};
