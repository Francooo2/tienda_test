const pool = require('../db')

const getProducts = async (req, res) => {
    
    const sql = 'SELECT RTRIM(UPPER(name)) AS nameProduct, url_image, price, discount, (SELECT name FROM category WHERE id = product.category) AS nameCategory FROM product ORDER BY nameCategory DESC'
    
    await pool.query(sql, (error, results) => {
        if (error) {
            res.status(404).send('Servicio no disponible.')
        } else {
            res.status(200).json(results)
        }
    })
    
}

const getProduct = async (req, res) => {
    
    const name = req.params.name
    
    if( name[name.length-1] === '°' ) {
        const sql = 'SELECT * FROM product WHERE SUBSTRING(RTRIM(UPPER(name)), 0, LENGTH(RTRIM(UPPER(name))) - 1) = ?'
        await pool.query(sql, name.substring(0, name.length - 1), (error, results) => {
            if (error) {
                res.status(404).send('Servicio no disponible.')
            } else {
                res.status(200).json(results)
            }
        })
    } else {
        const sql = 'SELECT * FROM product WHERE RTRIM(UPPER(name)) = ?'
        await pool.query(sql, name, (error, results) => {
            if (error) {
                res.status(404).send('Servicio no disponible.')
            } else {
                res.status(200).json(results)
            }
        })
    }


}

module.exports = {
    getProducts,
    getProduct
}