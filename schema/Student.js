import Sequelize from "sequelize";
import { dbConn } from "../modules/dbConn";

const Student = dbConn.define("Student", {
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
  },
  suspended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
}, {
  indexes: [
    { fields: ['email'], unique: true }
  ]
});


export default Student;