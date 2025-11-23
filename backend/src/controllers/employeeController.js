const { Employee } = require("../models");


exports.createEmployee = async (req, res) => {
try {
const { name, role, salary } = req.body;
const org = req.user.org;


await Employee.create({ name, role, salary, organisation_id: org });
res.json({ message: "Employee created" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};


exports.getEmployees = async (req, res) => {
try {
const org = req.user.org;
const employees = await Employee.findAll({ where: { organisation_id: org } });
res.json(employees);
} catch (err) {
res.status(500).json({ error: err.message });
}
};