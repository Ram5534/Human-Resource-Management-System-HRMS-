const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const teamController = require("../controllers/teamController");

router.post("/", auth, teamController.createTeam);
router.get("/", auth, teamController.getTeams);
router.put("/:id", auth, teamController.updateTeam);
router.delete("/:id", auth, teamController.deleteTeam);

// Employee assignments
router.post("/:teamId/employees", auth, teamController.assignEmployee);
router.delete("/:teamId/employees/:employeeId", auth, teamController.removeEmployee);

module.exports = router;
