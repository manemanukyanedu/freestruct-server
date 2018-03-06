module.exports = (sequelize, DataType) => {
  const Tool = sequelize.define('Tool', {
    name: {
      type: DataType.STRING,
      unique: true
    },
    path: {
      type: DataType.STRING,
      unique: true
    },
    description: {
      type: DataType.TEXT
    },
    overview: {
      type: DataType.STRING
    },
    icon: {
      type: DataType.STRING
    }
  })

  return Tool
}

