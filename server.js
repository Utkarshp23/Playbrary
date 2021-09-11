if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//import index router
const indexRouter = require('./routes/index')

//set View engine
app.set('view engine', 'ejs')

//set where from our views comming
app.set('views', __dirname + '/views')

//Hook up express layouts
app.set('layout', 'layouts/layout')

//tell express app to use express layouts
app.use(expressLayouts)

//tell express app where are our public files
app.use(express.static('public'))

//Views folder contain server rendered views

//Use mongoose & connect to database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//Use index router
app.use('/', indexRouter)

//tell app where we want to listen
app.listen(process.env.PORT || 3000)