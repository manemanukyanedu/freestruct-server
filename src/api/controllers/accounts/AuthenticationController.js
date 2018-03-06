const {Account} = require('../../models')
const jwt = require('jsonwebtoken')
const config = require("../../../config/config")

const AuthenticationControllerPolicy = require('../../policies/AuthenticationCotrollerPolicy')

function jwtSignUser (account) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(account, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res, next) {
    try {
      const account = await Account.create(req.body)
      const accountJson = account.toJSON()
      res.status(200).send({
        user: accountJson,
        token: jwtSignUser(accountJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email already in use'
      })
    }
  },
  async login (req, res, next) {
    try {
      const {email, password} = req.body
      const account = await Account.findOne({
        where: {
          email: email
        }
      })
      if (!account) {
        return res.status(403).send({
          error: 'No such email or password!'
        })
      }
      const isPasswordWalid = await account.comparePassword(password)
      if (!isPasswordWalid) {
        return res.status(403).send({
          error: 'The provided email or password is wrong!'
        })
      }
      const accountJson = account.toJSON()
      res.status(200).send({
        user: accountJson,
        token: jwtSignUser(accountJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'Ann error has occurred when trying to log in.'
      })
    }
  }
}