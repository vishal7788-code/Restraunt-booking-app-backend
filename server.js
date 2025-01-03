import express from "express";
import cors from "cors";
import bookingRoute from "./routes/booking.route.js";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";


dotenv.config({})

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "https://restraunt-booking-frontend.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
const PORT = process.env.PORT

app.use("/api/v1/booking", bookingRoute);

app.listen(PORT, ()  =>{
    connectDB()
console.log(`Server is running on`)
})