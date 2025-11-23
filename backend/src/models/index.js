const Sequelize = require("sequelize");
const sequelize = require("../db");


const Organisation = require("./organisation")(sequelize);
const User = require("./user")(sequelize);
const Employee = require("./employee")(sequelize);
const Team = require("./team")(sequelize);
const EmployeeTeam = require("./employeeTeam")(sequelize);
const Log = require("./log")(sequelize);


// Associations
Organisation.hasMany(User, { foreignKey: "organisation_id" });
User.belongsTo(Organisation, { foreignKey: "organisation_id" });


Organisation.hasMany(Employee, { foreignKey: "organisation_id" });
Employee.belongsTo(Organisation, { foreignKey: "organisation_id" });


Organisation.hasMany(Team, { foreignKey: "organisation_id" });
Team.belongsTo(Organisation, { foreignKey: "organisation_id" });


Employee.belongsToMany(Team, { through: EmployeeTeam, foreignKey: "employee_id" });
Team.belongsToMany(Employee, { through: EmployeeTeam, foreignKey: "team_id" });


User.hasMany(Log, { foreignKey: "user_id" });
Log.belongsTo(User, { foreignKey: "user_id" });


module.exports = { sequelize, Organisation, User, Employee, Team, EmployeeTeam, Log };