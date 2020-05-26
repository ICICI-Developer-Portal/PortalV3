var express = require("express");
var app = express();

app.use("/", express.static("./dist/ICICI"));

app.listen(3000);
