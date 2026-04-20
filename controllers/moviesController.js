const connection = require("../data/db")

const index = (req, res) => {
  
    const sql= `SELECT * FROM movies`

    connection.query(sql, (err, results)=>{
        if(err) return res.status(500).json({
            error:true,
            message:"Database error"
        })
        
        res.json(results)
    })
    

}

const show = (req, res) => {
  res.send('show')
}

module.exports = {
    index,
     show
    }