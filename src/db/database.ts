'use strict'
import { Sequelize } from 'sequelize'
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from '../config'


// export const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432,
// })

export const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: 'postgres',
  port: DATABASE_PORT,
})
