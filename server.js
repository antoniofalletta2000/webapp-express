const express = require('express')
const app = express()
const port = 3000
const moviesRouter = require("./routes/moviesRoute")

app.use(express.static('public'))

app.use("/movies", moviesRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
