const express = require('express')
const dotenv  = require('dotenv')
const helmet  = require('helmet')
const cors    = require('cors')

const app = express()
dotenv.config({ path: './.env'})
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(helmet())
app.use(cors())

app.set('port', process.env.PORT || 3000)

app.use('/', require('./routes/filters'))

app.listen(app.get('port'), () => {
 console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
})