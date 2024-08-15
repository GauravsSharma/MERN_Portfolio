const { addProject, updateProject, deleteProject } = require("../controller/Project");
const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/addproject").post(isAuthenticated,addProject);

router.route("/updateProject/:id").put(isAuthenticated,updateProject);

router.route("/deleteProject/:id").delete(isAuthenticated,deleteProject);

module.exports = router;