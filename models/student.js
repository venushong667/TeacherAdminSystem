const Sequelize = require("sequelize");
const db = require("../config/database");

const Students = db.sequelize.define(
  "students",
  {
    email: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    isSuspended: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = Students;
