import express from "express";
import {createBooking, deleteBooking, getBookings} from "../controllers/booking.contorller.js";

const router = express.Router()

router.route("/bookTable").post(createBooking)
router.route("/getBookings/:phoneNumber").get(getBookings)
router.route("/deleteBooking").delete(deleteBooking)


export default router;