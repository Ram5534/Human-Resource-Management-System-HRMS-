const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
return sequelize.define("Employee", {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: DataTypes.STRING,
role: DataTypes.STRING,
salary: DataTypes.FLOAT,
organisation_id: DataTypes.INTEGER,
});
};