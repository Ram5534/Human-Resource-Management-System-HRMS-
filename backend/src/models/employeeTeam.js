const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
return sequelize.define("EmployeeTeam", {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
employee_id: DataTypes.INTEGER,
team_id: DataTypes.INTEGER,
});
};