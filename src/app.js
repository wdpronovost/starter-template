const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("/dist/"));

app.get("/", function(req, res) {
	res.render("index.ejs");
});

app.listen(7000);
