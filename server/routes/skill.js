const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { addSkill, updateSkill, deleteSkill } = require("../controller/Skill");
const router = express.Router();

router.route("/addSkill").post(isAuthenticated,addSkill);

router.route("/updateSkill/:id").put(isAuthenticated,updateSkill);

router.route("/deleteSkill/:id").delete(isAuthenticated,deleteSkill);

module.exports = router;

