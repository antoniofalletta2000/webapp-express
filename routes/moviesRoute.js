const express = require("express")
const router = express.Router()
const moviesController = require("../controllers/moviesController")

//index
router.get('/', moviesController.index)

//show
router.get('/:id', moviesController.show)

//storeReview
router.post('/:id/review', moviesController.storeReview)

//storeMovie
router.post('/admin', moviesController.storeMovie)

module.exports = router