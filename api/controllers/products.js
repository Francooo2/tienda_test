const pool = require('../db')

const getProducts = async (req, res) => {

    const sql = 'SELECT RTRIM(UPPER(name)) AS nameProduct, url_image, price, discount, (SELECT name FROM category WHERE id = product.category) AS nameCategory, category FROM product ORDER BY nameCategory DESC'

    await pool.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({ "message": "Servicio no disponible." })
        } else {
            res.status(200).json(results)
        }
    })

}

const getProduct = async (req, res) => {

    const name = req.params.name
    const sql = 'SELECT * FROM product WHERE RTRIM(UPPER(name)) = ?'

    await pool.query(sql, name, (error, results) => {
        if (error) {
            res.status(500).json({ "message": "Servicio no disponible." })
        } else {
            res.status(200).json(results)
        }
    })

}

const getCategory = async (req, res) => {

    const category = parseInt(req.params.category)
    const sql      = 'SELECT *, (SELECT name FROM category WHERE id = product.category) AS nameCategory FROM product WHERE category = ?'

    await pool.query(sql, category, (error, results) => {
        if (error) {
            res.status(500).json({ "message": "Servicio no disponible." })
        } else {
            res.status(200).json(results)
        }
    })

}

module.exports = {
    getProducts,
    getProduct,
    getCategory
}