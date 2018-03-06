const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling GET requests to /quizzes'
	})
})

router.get('/:quizID', (req, res, next) => {
	const id = req.params.quizID;
	if (id === '00') {
		res.status(200).json({
			message: 'Quiz with id 00',
			id: id
		})
	} else {
		res.status(200).json({
			message: 'Other quiz',
			id: id
		})
	}
	
})

router.post('/', (req, res, next) => {
	const quiz = {
		title: req.body.title,
		id: req.body.id
	}
	res.status(201).json({
		message: 'Handling POST requests to /quizzes',
		quiz: quiz.title
	})
})

router.patch('/:quizID', (req, res, next) => {
	const id = req.params.quizID;
	res.status(200).json({
		message: 'Updated quiz by ' + id
	})
})
router.delete('/:quizID', (req, res, next) => {
	const id = req.params.quizID;
	res.status(200).json({
		message: 'Deleted quiz by ' + id
	})
})

module.exports = router