const db = require('../db');
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
return sequelize.define("Log", {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
user_id: DataTypes.INTEGER,
action: DataTypes.STRING,
description: DataTypes.STRING,
});
};

exports.logAction = async (userId, action, details = '') => {
  await db.query(
    'INSERT INTO logs (user_id, action, details) VALUES ($1,$2,$3)',
    [userId, action, details]
  );
};
