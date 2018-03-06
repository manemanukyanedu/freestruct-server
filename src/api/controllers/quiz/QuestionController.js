const {Question} = require('../../models')
// Question.sync({force: true})
module.exports = {
  async getAll (req, res, next) {
    try {
      const userId = req.body.userId
      const quizId = req.body.quizId
      const questions = await Question.findAll({
        where: {
          userId: userId,
          quizId: quizId
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })
      res.status(200).send({
        questions: questions
      })
    } catch (err) {
      res.status(500).send({
        error: 'Ann error has occurred when trying to fetch the questions.'
      })
    }
  },
  async getById (req, res, next) {
    try {
      const userId = req.body.userId
      const quizId = req.body.quizId
      const id = req.body.id
      const question = await Question.findOne({
        where: {
          userId: userId,
          quizId: quizId,
          id: id
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })
      res.status(200).send({
        question: question
      })
    } catch (err) {
      res.status(500).send({
        error: 'Ann error has occurred when trying to fetch the question.'
      })
    }
  },
  async saveQuestion (req, res, next) {
    try {
      const question = await Question.create(req.body)
      res.status(200).send({
        question: question
      })
    } catch (err) {
      console.log('create question catch', err)
      res.status(500).send({
        error: 'Ann error has occurred when trying to create the question.'
      })
    }
  },
  async deleteQuestion (req, res, next) {
    try {
      const userId = req.body.userId
      const quizId = req.body.quizId
      const id = req.body.id
      const question = await Question.findOne({
        where: {
          userId: userId,
          quizId: quizId,
          id: id
        }
      })
      await question.destroy()
      res.status(200).send({
        message: 'Deleted'
      })
    } catch (err) {
      console.log('create question catch', err)
      res.status(500).send({
        error: 'Ann error has occurred when trying to delete the question.'
      })
    }
  },
  async editQuestion (req, res, next) {
    try {
      const userId = req.body.userId
      const quizId = req.body.quizId
      const id = req.body.id
      let result = await Question.update({
          question: req.body.question,
          answers: req.body.answers
        }, {
          where: {
            userId: userId,
            quizId: quizId,
            id: id
          }
        });
      res.status(200).send({
        result: result,
        message: 'Updated'
      })
    } catch (err) {
      console.log('create question catch', err)
      res.status(500).send({
        error: 'Ann error has occurred when trying to edit the question.'
      })
    }
  }
}