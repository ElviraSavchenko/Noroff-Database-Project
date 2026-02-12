//We will use the ‘dotenv’ package to load environment variables from the .env file so that we can call them in our application as:
//process.env.VARIABLE_NAME 

require('dotenv').config()

//----
const fs = require("fs")
const path = require("path")

//basename - gets the current file name (in my case here it is index.js)
const basename = path.basename(__filename);

const Sequelize = require('sequelize')



const connection = {
  dialect : process.env.DIALECT,
  dialectModel : process.env.DIALECTMODEL,
  database : process.env.DATABASE_NAME,
  username : process.env.ADMIN_USERNAME,
  password : process.env.ADMIN_PASSWORD,
  host: process.env.HOST
}

// connect to db
const sequelize = new Sequelize(connection);

const db = {};
db.sequelize = sequelize;
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) &&
      (file.slice(-3) === '.js');
    })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize,Sequelize);
    db[model.name] = model; //[model.name] = name of the model (table we have, like User, Hotel, etc)
    console.log(db)
  });
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

module.exports = db