import nodemailer from "nodemailer";
import express from "express";
import dotenv from "dotenv";
import router from "./routes/emailMe.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use("/api/send-email", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
