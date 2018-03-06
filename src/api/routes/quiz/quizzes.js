const QuizController = require('../../controllers/quiz/QuizController')

const express = require('express')
const router = express.Router()

router.get('/user:id',
           QuizController.index
      )
router.post('/quiz',
           QuizController.getById
      )
router.post('/',
           QuizController.saveQuiz
      )
router.post('/edit',
           QuizController.editQuiz
      )
router.post('/delete',
           QuizController.deleteQuiz
      )

module.exports = router