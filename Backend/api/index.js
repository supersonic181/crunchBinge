const path = require("path");

const router = require("express").Router();
router.use("/users", require("./routes/users.routes"));;

module.exports = router;