module.exports = (sequelize, DataType) => {
  const Question = sequelize.define('Question', {
    question: {
      type: DataType.STRING,
      unique: true
    },
    id: {
      type: DataType.STRING,
      unique: true,
      primaryKey: true
    },
    userId: {
      type: DataType.STRING
    },
    quizId: {
      type: DataType.STRING
    },
    answers: {
      type: DataType.TEXT
    }
  })

  return Question
}
