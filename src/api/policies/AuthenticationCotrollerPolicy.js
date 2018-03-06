const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      fullname: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]')
      ),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}')
      )
    }

    const {error, value} = Joi.validate(req.body, schema)

    if (error) {
      console.log(error.details[0].context.key)
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'fullname':
          res.status(400).send({
            error: 'You must provide a valid name'
          })
          break
        case 'password':
          res.status(400).send({
            error: {
              title: 'The password provided failed to match the following rules',
              desc: ['It must contain only the folloing charecters: lower case, upper case, numberics',
                    'It must be at list 8 charecters in length and not greater then 32 charecters in length']
            }
          })
          break
        default:
          res.status(400).send({
            error: 'Invlid registration information'
          })
      }
    } else {
      next()
    }
  }
}