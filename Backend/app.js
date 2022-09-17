const express = require("express");
const app = express();
const appService = require("./appService");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
appService.connectToDB();
appService.setAPIMiddleware(app);
appService.apiSetUp(app);

module.exports = app;
