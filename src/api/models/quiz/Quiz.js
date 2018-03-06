module.exports = (sequelize, DataType) => {
  const Quiz = sequelize.define('Quiz', {
    title: {
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
    description: {
      type: DataType.TEXT
    },
    questionsCount: {
      type: DataType.INTEGER,
      defaultValue: 0
    },
    passingCount: {
      type: DataType.INTEGER,
      defaultValue: 0
    },
    usersCount: {
      type: DataType.INTEGER,
      defaultValue: 0
    },
    langs: {
      type: DataType.ARRAY(DataType.TEXT) 
    },
    total: {
      type: DataType.BOOLEAN,
      defaultValue: false
    },
    answers: {
      type: DataType.BOOLEAN,
      defaultValue: false
    },
    free: {
      type: DataType.BOOLEAN,
      defaultValue: false
    }
  })

  return Quiz
}
