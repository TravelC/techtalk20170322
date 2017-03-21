//@flow

import Sequelize from 'sequelize'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import Boom from 'boom'
import Database from '../database'

const Person = Database.getInstance().define('person', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notEmpty: true
    },
    allowNull: false,
    unique: true
  },
  salt: {
    type: Sequelize.STRING(64),
    allowNull: false
  },
  hash: {
    type: Sequelize.STRING(64),
    allowNull: false
  }
},
{
  underscored: true,
  defaultScope: {
    attributes: { exclude: ['salt', 'hash'] }
  },
  setterMethods: {
    password: function(password: string) {
      if (!password || password.length < 6) {
        throw Boom.expectationFailed('password should have at least 6 characters')
      }
      const buf = crypto.randomBytes(32)
      const salt = buf.toString('hex')
      this.setDataValue('salt', salt)
      this.setDataValue('hash', Person.hash(password, salt))
    }
  },
  classMethods: {
    hash(password: string, salt: string): string {
      return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha512').toString('hex')
    }
  },

  instanceMethods: {
    toSafeJSON() {
      const json = this.toJSON()
      delete json.salt
      delete json.hash
      return json
    },
    matchPassword(password: string): boolean {
      return this.hash === Person.hash(password, this.salt)
    },
    generateToken(): string {
      return jwt.sign({
        id: this.id
      }, process.env.AUTH_SECRET)
    }
  }
})

export default Person
