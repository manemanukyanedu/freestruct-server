const {Quiz} = require('../../models')
const {Question} = require('../../models')
// Quiz.sync({force: true})
module.exports = {
  async index (req, res, next) {
    try {
      const userId = (req.params.id).slice(1)
      const quizzes = await Quiz.findAll({
        where: {
          userId: userId
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })
      res.status(200).send({
        quizzes: quizzes
      })
    } catch (err) {
      res.status(500).send({
        error: 'Ann error has occurred when trying to fetch the quizzes.'
      })
    }
  },
  async getById (req, res, next) {
    try {
      const userId = req.body.userId
      const id = req.body.id
      let quiz = await Quiz.findOne({
        where: {
          userId: userId,
          id: id
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })
      const count = await Question.count({
        where: {
          userId: userId,
          quizId: id
        }
      })
      quiz.questionsCount = count
      res.status(200).send({
        quiz: quiz
      })
    } catch (err) {
      res.status(500).send({
        error: 'Ann error has occurred when trying to fetch the quiz.'
      })
    }
  },
  async saveQuiz (req, res, next) {
    try {
      const result = await Quiz.findOrCreate({where: {title: req.body.title}, defaults: req.body})
      if (result[1]) {
        res.status(200).send({
          created: true,
          message: 'Quiz created successfully'
        })
      } else {
        res.status(200).send({
          created: false,
          message: 'Cannot create the quiz, a quiz with "' + result[0].title + '" title already exists.'
        })
      }
    } catch (err) {
      console.log('create quiz catch', err)
      res.status(500).send({
        error: 'Ann error has occurred when trying to create the quiz.'
      })
    }
  },
  async deleteQuiz (req, res, next) {
    try {
      const userId = req.body.userId
      const id = req.body.id
      const quiz = await Quiz.findOne({
        where: {
          userId: userId,
          id: id
        }
      })
      await quiz.destroy()
      res.status(200).send({
        message: 'Deleted'
      })
    } catch (err) {
      console.log('create quiz catch', err)
      res.status(500).send({
        error: 'Ann error has occurred when trying to delete the quiz.'
      })
    }
  },
  async editQuiz (req, res, next) {
    try {
      const userId = req.body.userId
      const id = req.body.id
      let result = await Quiz.update({
          title: req.body.title,
          description: req.body.description,
          total: req.body.total,
          langs: req.body.langs,
          answers: req.body.answers,
          free: req.body.free,
        }, {
          where: {
            userId: userId,
            id: id
          }
        });
      res.status(200).send({
        result: result,
        message: 'Updated'
      })
    } catch (err) {
      console.log('create quiz catch', err)
      res.status(500).send({
        error: 'Ann error has occurred when trying to edit the quiz.'
      })
    }
  }
}