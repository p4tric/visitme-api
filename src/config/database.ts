// import { Sequelize } from 'sequelize-typescript';
import Logger from './logger';

const { Sequelize } = require('sequelize');
const LOG = new Logger('database.ts');

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_SCHEMA = 'visitme',
  DB_USER = 'root',
  DB_PW = 'admin',
  DB_POOL_ACQUIRE = '30000',
  DB_POOL_IDLE = '10000',
  DB_POOL_MAX_CONN = '10',
  DB_POOL_MIN_CONN = '1',
  DB_LOG_LEVEL = 'info',
} = process.env

export default new Sequelize(DB_SCHEMA, DB_USER, DB_PW, {
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  pool: {
    acquire: parseInt(DB_POOL_ACQUIRE),
    idle: parseInt(DB_POOL_IDLE),
    max: parseInt(DB_POOL_MAX_CONN),
    min: parseInt(DB_POOL_MIN_CONN)
  },
  timezone: '+08:00',
  logging: (msg: string) => {
    LOG.log(DB_LOG_LEVEL, msg);
  },
});
