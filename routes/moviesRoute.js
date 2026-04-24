const express = require("express")
const router = express.Router()
const moviesController = require("../controllers/moviesController")
const upload = require("../middlewares/fileUpload")
//index
router.get('/', moviesController.index)

//show
router.get('/:id', moviesController.show)

//storeReview
router.post('/:id/review', moviesController.storeReview)

//storeMovie
router.post('/admin', upload.single('image'), moviesController.storeMovie)

module.exports = router