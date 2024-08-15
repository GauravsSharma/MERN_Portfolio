const { register, login, getUser } = require("../controller/User");
const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getuser").get(isAuthenticated,getUser);

module.exports = router;