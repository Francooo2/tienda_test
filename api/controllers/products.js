const pool = require('../db')

const getProducts = async (req, res) => {
    
    const sql = 'SELECT * FROM product ORDER BY category'

    await pool.query(sql, (error, results) => {
        if (error) {
            res.send('Servicio no disponible.')
        } else {
            res.json(results)
        }
    })

}

module.exports = {
    getProducts
}