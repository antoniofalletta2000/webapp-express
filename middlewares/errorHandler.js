const { error } = require("node:console");

function errorHandler (err, req, res, next){
    console.log(err.message)
    res.status(500).json({
        error:true,
        message: "Internal server error"
    })
}

module.exports = errorHandler