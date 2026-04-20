const { log } = require("node:console")
const connection = require("../data/db")
const { json } = require("body-parser")

//index
const index = (req, res) => {
    
    const sql = `SELECT * FROM movies`

    connection.query(sql, (err, results) => {
        
        if (err) return res.status(500).json({
            error: true,
            message: "Database error"
        })

        res.json(results)
    })


}

//show
const show = (req, res) => {

    const { id } = req.params

    const movieSql = `SELECT * FROM movies WHERE id=?`

    const reviewSql = `SELECT * FROM reviews WHERE movie_id = ?`

    connection.query(movieSql, [id], (err, movieResults) => {

        if (err) return res.status(500).json({
            error: true,
            message: "Database error"
        })

        if (movieResults.length === 0) return res.status(404).json({
            error: true,
            message: "Movie Not Found"
        })

        const movie = movieResults[0]

        connection.query(reviewSql, [id], (err, reviewResults) => {

            if (err) return res.status(500).json({
                error: true,
                message: "Database error"
            })

            if (reviewResults.length === 0) return res.status(404).json({
                error: true,
                message: "Movie Not Found"
            })

            movie.reviews = reviewResults

            res.json(movie)
        })

    })
}

module.exports = {
    index,
    show
}