//Config
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const loginRoute = require("./routes/loginRoutes");

//Connection to DB
mongoose
  .connect(process.env.MONGO_API_KEY)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Error connecting to database"));

//Middleware
app.use(express.json());
app.use(cors());
app.use("/login", loginRoute);

//Routes
app.get("/", (req, res) => {
  res.send("API Ready");
});

app.listen(port, () => {
  console.log(`Ready, listening on port ${port}`);
});
