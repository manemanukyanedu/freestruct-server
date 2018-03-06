const AuthenticationController = require('../../controllers/accounts/AuthenticationController')

const express = require('express')
const router = express.Router()

router.post('/',
           AuthenticationController.login
      )

module.exports = router