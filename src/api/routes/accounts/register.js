const AuthenticationController = require('../../controllers/accounts/AuthenticationController')
const AuthenticationControllerPolicy = require('../../policies/AuthenticationCotrollerPolicy')

const express = require('express')
const router = express.Router()

router.post('/',
           AuthenticationControllerPolicy.register,
           AuthenticationController.register
      )

module.exports = router