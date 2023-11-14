import express from 'express'
import mustacheExpress from 'mustache-express'
import bodyParser from 'body-parser'
import { __dirname } from './dirname.js'
import router1  from './router1.js'

const app = express()

app.set('views', __dirname + '/../views')
app.set('view engine', 'mustache')
app.engine('mustache', mustacheExpress())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../public'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/', router1)

app.listen(3000, () => console.log('Listening on port 3000!'))