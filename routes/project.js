const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project_controller')

router.post('/create', projectController.createProject)

router.get('/:projectId', projectController.project)

router.post('/:projectId', projectController.createIssue)

module.exports = router
