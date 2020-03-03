const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize("ufinity2", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Database authentiation
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

//Synchronize ./models into database
sequelize
  .sync({})
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch(err => {
    console.error("Unable to synchronize models:", err);
  });

const checkDB = async () => {
  await sequelize.sync();
};

module.exports = db;
