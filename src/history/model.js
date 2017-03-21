//@flow

import Sequelize from 'sequelize'
import Database from '../database'
import Person from '../person/model'

const History = Database.getInstance().define('history', {
  path: Sequelize.STRING,
  body: Sequelize.TEXT,
  host: Sequelize.STRING,
  user_agent: Sequelize.STRING,
  time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  underscored: true,
  timestamps: false,
  scopes: {
    last(action: string) {
      return {
        where: { action },
        limit: 1,
        order: [['time', 'DESC']],
        attributes: ['time', 'action'],
        include: [{
          model: Person,
          attributes: ['first_name', 'last_name']
        }]
      }
    }
  }
})

Person.hasMany(History, {
  onDelete: 'cascade'
})
History.belongsTo(Person, {
  constraints: false
})

export default History
