import Sequelize from "sequelize";
import { dbConn } from "../modules/dbConn";

const Teacher = dbConn.define("Teacher", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
}, {
  indexes: [
    {fields: ['email'], unique: true}
  ]
});


export default Teacher;