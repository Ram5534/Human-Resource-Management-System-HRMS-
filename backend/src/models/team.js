const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
return sequelize.define("Team", {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: DataTypes.STRING,
organisation_id: DataTypes.INTEGER,
});
};