const { Team, EmployeeTeam, Employee, Log } = require("../models");

exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const org = req.user.org;

    const team = await Team.create({ name, organisation_id: org });

    // Log creation
    await Log.create({ user_id: req.user.id, action: "CREATE_TEAM", description: `Created team: ${name}` });

    res.json({ message: "Team created", team });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const org = req.user.org;
    const teams = await Team.findAll({
      where: { organisation_id: org },
      include: { model: Employee, through: { attributes: [] } },
    });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const org = req.user.org;

    const team = await Team.findOne({ where: { id, organisation_id: org } });
    if (!team) return res.status(404).json({ error: "Team not found" });

    team.name = name || team.name;
    await team.save();

    await Log.create({ user_id: req.user.id, action: "UPDATE_TEAM", description: `Updated team: ${name}` });

    res.json({ message: "Team updated", team });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const org = req.user.org;

    const team = await Team.findOne({ where: { id, organisation_id: org } });
    if (!team) return res.status(404).json({ error: "Team not found" });

    await team.destroy();

    await Log.create({ user_id: req.user.id, action: "DELETE_TEAM", description: `Deleted team: ${team.name}` });

    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign employee to team
exports.assignEmployee = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { employeeId } = req.body;
    const org = req.user.org;

    // Ensure team and employee belong to the org
    const team = await Team.findOne({ where: { id: teamId, organisation_id: org } });
    const employee = await Employee.findOne({ where: { id: employeeId, organisation_id: org } });
    if (!team || !employee) return res.status(404).json({ error: "Team or Employee not found" });

    await EmployeeTeam.findOrCreate({ where: { team_id: teamId, employee_id: employeeId } });

    await Log.create({ user_id: req.user.id, action: "ASSIGN_EMPLOYEE", description: `Assigned ${employee.name} to ${team.name}` });

    res.json({ message: "Employee assigned to team" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove employee from team
exports.removeEmployee = async (req, res) => {
  try {
    const { teamId, employeeId } = req.params;
    const org = req.user.org;

    const assignment = await EmployeeTeam.findOne({ where: { team_id: teamId, employee_id: employeeId } });
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });

    await assignment.destroy();

    await Log.create({ user_id: req.user.id, action: "REMOVE_EMPLOYEE", description: `Removed employeeId ${employeeId} from teamId ${teamId}` });

    res.json({ message: "Employee removed from team" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
