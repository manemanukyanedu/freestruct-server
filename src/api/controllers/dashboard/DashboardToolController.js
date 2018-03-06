const {Tool} = require('../../models')

module.exports = {
  async index (req, res, next) {
    try {
      const tools = await Tool.findAll({
        attributes: ['icon', 'name', 'overview', 'path', 'description'],
        limit: 15
      })
      res.status(200).send({
        tools: tools
      })
    } catch (err) {
      res.status(500).send({
        error: 'Ann error has occurred when trying to fetch the tools.'
      })
    }
  },
  async details (req, res, next) {
    try {
      const tools = await Tool.findAll({
        attributes: ['icon', 'name', 'overview', 'path', 'description', 'id'],
        limit: 15
      })
      res.status(200).send({
        tools: tools
      })
    } catch (err) {
      res.status(500).send({
        error: 'Ann error has occurred when trying to fetch the tools.'
      })
    }
  },
  async post (req, res, next) {
    try {
      const tool = await Tool.create(req.body)
      res.status(200).send({
        tool: tool
      })
    } catch (err) {
      console.log('create tool catch', err)
      res.status(500).send({
        error: 'Ann error has occurred when trying to create the tool.'
      })
    }
  },
  async deleteTool (req, res, next) {
    try {
      const i = Number((req.params.id).slice(1))
      const tool = await Tool.findById(i)
      await tool.destroy()
      res.status(200).send({
        msg: 'deleted'
      })
    } catch (err) {
      console.log('create tool catch', err)
      res.status(500).send({
        error: 'Ann error has occurred when trying to delete the tool.'
      })
    }
  },
  async editTool (req, res, next) {
    try {
      const i = Number((req.params.id).slice(1))
      const tool = await Tool.findById(i)
      const t = req.body
      tool.update({ name: t.name, path: t.path, description: t.description, overview: t.overview, icon: t.icon })
      res.status(200).send({
        msg: 'updated'
      })
    } catch (err) {
      console.log('create tool catch', err)
      res.status(500).send({
        error: 'Ann error has occurred when trying to edit the tool.'
      })
    }
  }
}
