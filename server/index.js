const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running!"));

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  app.listen(5000, () => console.log("Server started on http://localhost:5000"));
})
.catch(err => console.error(err));
