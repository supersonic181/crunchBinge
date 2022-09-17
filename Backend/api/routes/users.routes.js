const express = require("express");
const router = express.Router();
const controller = require("../controller/users.controller");

//Middleware Routes

// Public Routes
console.log("reaching");
router.post("/register", controller.userRegistration);
router.post("/login", controller.userLogin);
router.get("/getUser", controller.getUsers);
router.post("/watchLater", controller.watchLater);
router.post("/removeWatchLater", controller.removeWatchLater);
router.post("/verifyUser", controller.verifyUser);
router.post("/generateOTP", controller.generateOTP);
router.post("/changePass", controller.changePass);
router.post("/watchHistory", controller.watchHistory);
router.delete("/logout", controller.logout);


module.exports = router;