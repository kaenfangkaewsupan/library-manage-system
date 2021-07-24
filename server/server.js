const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");

require("dotenv").config();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("This is Home page");
});

app.listen(port, console.log("Server is running at port 8000"));

db.sequelize.sync({ force: false }).then(console.log("DB is sync already"));
