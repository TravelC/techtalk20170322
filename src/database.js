// @flow

import Sequelize from 'sequelize'
const env = process.env.NODE_ENV

let _instance: ?Sequelize = null

export default class Database {
  static getInstance() {
    if (!_instance) {
      if (env === 'test') {
        _instance = new Sequelize({
          dialect: 'sqlite',
          storage: ':memory:',
          logging: false
        })
        console.log('db - use in memory sqlite3')
      } else {
        _instance = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
          host: process.env.MYSQL_HOST,
          dialect: 'mysql',
          pool: {
            max: 5,
            min: 0,
            idle: 10000
          }
        })
      }
    }
    return _instance
  }
}
