const express = require("express");
const index = require('./Routes/index_route')
const cors = require("cors");

const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
require("./Database/Auth.db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("HELLO WORLD");
});

app.use(index);
app.use("/", index);


app.listen(port, () => {
    console.log(`listing to the port ${port}`);
});
