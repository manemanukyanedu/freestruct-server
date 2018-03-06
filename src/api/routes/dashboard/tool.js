const ToolController = require('../../controllers/dashboard/DashboardToolController')

const express = require('express')
const router = express.Router()

router.get('/',
           ToolController.index
      )
router.get('/details',
           ToolController.details
      )
router.post('/',
           ToolController.post
      )
router.post('/delete:id',
           ToolController.deleteTool
      )
router.post('/edit:id',
           ToolController.editTool
      )

module.exports = router