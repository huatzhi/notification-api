import { config as envConfig } from 'dotenv';
envConfig();

import Sequelize from 'sequelize';

export const dbConn = new Sequelize(
  process.env.DB_NAME || "notification_api", // database name 
  process.env.DB_USER || "root", // database user
  process.env.DB_PASS || "abc123", // database pw
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    dialect: "mysql",
    logging: false
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