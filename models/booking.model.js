import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true, 
    },
    time: {
        type: String,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export const Booking = mongoose.model("Booking", bookingSchema);
