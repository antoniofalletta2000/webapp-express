const express = require('express')
const app = express()
const port = 3000
const moviesRouter = require("./routes/moviesRoute")
const errorHandler = require ("./middlewares/errorHandler")
const notFound = require ("./middlewares/notFound")
const cors = require("cors")

app.use(cors())

app.use(express.json())

app.use(express.static('public'))

app.use("/movies", moviesRouter)

app.use(notFound)

app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

