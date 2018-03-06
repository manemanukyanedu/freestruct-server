const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (account, options) {
  const SALT_FACTOR = 10
  if (!account.changed('password')) {
    return;
  }
  return bcrypt
  .genSaltAsync(SALT_FACTOR)
  .then(salt => bcrypt.hashAsync(account.password, salt, null))
  .then(hash => {
    account.setDataValue('password', hash)
  })
}
module.exports = (sequelize, DataType) => {
  const Account = sequelize.define('Account', {
    email: {
      type: DataType.STRING,
      unique: true
    },
    password: {
      type: DataType.STRING
    },
    fullname: {
      type: DataType.STRING
    }
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  })

  Account.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return Account
}

