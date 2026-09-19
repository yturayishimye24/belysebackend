import nodemailer from "nodemailer";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/emailMe.js";
import connectDB from "./config/db.js"



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;
const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://abayisengabelyse.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean));

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin is not allowed by CORS"));
  },
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
}));

connectDB();
app.use("/api/send-email", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
