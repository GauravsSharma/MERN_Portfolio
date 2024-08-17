const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { addSkill, updateSkill, deleteSkill, getAllSkills } = require("../controller/Skill");
const router = express.Router();

router.route("/addSkill").post(isAuthenticated,addSkill);

router.route("/getAllSkills").get(getAllSkills);

router.route("/deleteSkill/:id").delete(isAuthenticated,deleteSkill);

module.exports = router;

