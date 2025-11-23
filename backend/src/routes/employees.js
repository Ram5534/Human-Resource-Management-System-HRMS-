const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const employeeController = require("../controllers/employeeController");


router.post("/", auth, employeeController.createEmployee);
router.get("/", auth, employeeController.getEmployees);


module.exports = router;