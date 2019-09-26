import Sequelize from 'sequelize';

// todo :: change to use env file
export const dbConn = new Sequelize(
  "notification_api", // database name 
  "root", // database user
  "abc123", // database pw
  {
    host: "localhost",
    port: "3306",
    dialect: "mysql"
  }
)

export const isDbConnected = async () => {
  try {
    await dbConn.authenticate();
    console.log('db connection is successful');
    return true;
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

isDbConnected();