const QuestionController = require('../../controllers/quiz/QuestionController')

const express = require('express')
const router = express.Router()

router.post('/getAll',
           QuestionController.getAll
      )
router.post('/question',
           QuestionController.getById
      )
router.post('/save',
           QuestionController.saveQuestion
      )
router.post('/edit',
           QuestionController.editQuestion
      )
router.post('/delete',
           QuestionController.deleteQuestion
      )

module.exports = router