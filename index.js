import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { routers } from "./src/routers/index.js";

// INIT
dotenv.config();
const app = express();

// MIDLERWARES
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTER
routers(app);

// CONNECT MONGODB USING MONGOOSE
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to mongodb successfully"));

// LISTENER
app.listen(process.env.PORT, () =>
  console.log(`Server up and running on http://localhost:${process.env.PORT}`)
);
