// require packages and set variables
const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// connect to database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static files import
app.use(express.static('public'))
// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// route setting
// index page
app.get('/', (req, res) => {
  Restaurant.find().lean().then(restaurant => res.render('index', { restaurant })).catch(error => console.error)
})

// new page
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// create new data
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// show page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// save edit
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.findById(id)
    .then(restaurant => {{ restaurant.name = name, restaurant.name_en = name_en, restaurant.category = category, restaurant.image = image, restaurant.location = location, restaurant.phone = phone, restaurant.google_map = google_map, restaurant.rating = rating, restaurant.description = description }
    return restaurant.save()})
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete page
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// search function
app.get('/search', (req, res) => {
  const filteredRestaurant = restaurants.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.trim().toLowerCase()) || restaurant.category.toLowerCase().includes(req.query.keyword.trim().toLowerCase())
  })
    
  res.render('index', { restaurants: filteredRestaurant, keyword: req.query.keyword })
})

// start and listen server
app.listen(port, () => {
  console.log(`This express server is running at http://localhost:${port}`)
})