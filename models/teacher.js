const Sequelize = require("sequelize");
const db = require("../config/database");

const Teachers = db.sequelize.define(
  "teachers",
  {
    email: {
      type: Sequelize.STRING,
      primaryKey: true
    }
  },
  {
    timestamps: false
  }
);

module.exports = Teachers;
