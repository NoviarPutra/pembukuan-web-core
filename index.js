const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const routers = require("./src/routers/index");

// INIT
dotenv.config();
const app = express();

// MIDLERWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTER
routers(app);
app.get("/", (req, res) => {
  res.json(entryPoint());
});
// CONNECT MONGODB USING MONGOOSE
mongoose.connect(process.env.ATLAS_URI, {
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
