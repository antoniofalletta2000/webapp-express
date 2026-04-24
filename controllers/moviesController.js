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

    const movieSql = `SELECT * FROM movies WHERE id = ?`

    const reviewSql = `SELECT * FROM reviews WHERE movie_id = ?`

    const averageVoteSql = `SELECT AVG(vote) as movie_vote FROM reviews WHERE movie_id = ?`

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
        })

        connection.query(averageVoteSql, [id], (err, voteAverageResults) => {
            if (err) return res.status(500).json({
                error: true,
                message: "Database error"
            })

            if (voteAverageResults.length === 0) return res.status(404).json({
                error: true,
                message: "Movie Not Found"
            })

            movie.average_vote = voteAverageResults[0].movie_vote

            res.json(movie)
        })

    })
}

const storeReview = (req, res) => {

    const movieId = Number(req.params.id)
    const { name, vote, text } = req.body

    if (!name || !vote || !text) return res.status(400).json({
        error: true,
        message: "Missing required fields"
    })

    const sql = `INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)`

    connection.query(sql, [movieId, name, vote, text], (err, results) => {

        if (err) return res.status(500).json({
            error: true,
            message: "Database error"
        })

        res.status(201).json({
            error: false,
            message: "Review added successfully"
        })

    })

}

const storeMovie = (req, res) => {

    const { title, director, genre } = req.body

    const image = req.file ? `http://localhost:3000/${req.file.filename}` : null

    if (!title || !director || !genre) return res.status(400).json({
        error: true,
        message: "Missing required fields"
    })



    const sql = `INSERT INTO movies (title, director, genre, image) VALUES (?, ?, ?, ?)`

    connection.query(sql, [title, director, genre, image], (err, results) => {

        if (err) return res.status(500).json({
            error: true,
            message: "Database error"
        })

        res.status(201).json({
            error: false,
            message: "Movie added successfully"
        })

    })

}



module.exports = {
    index,
    show,
    storeReview,
    storeMovie
}