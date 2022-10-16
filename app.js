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

app.post('/restaurants', (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({ id, name, name_en, category, image, location, phone, google_map, rating, description }).then(() => res.redirect('/')).catch(error => console.log(error))
})

// show page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant => req.params.id === restaurant.id.toString())
  res.render('show', { restaurant })
})

// search function
app.get('/search', (req, res) => {
  const filteredRestaurant = restaurants.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.trim().toLowerCase()) | restaurant.category.toLowerCase().includes(req.query.keyword.trim().toLowerCase())
  })
    
  res.render('index', { restaurants: filteredRestaurant, keyword: req.query.keyword })
})

// start and listen server
app.listen(port, () => {
  console.log(`This express server is running at http://localhost:${port}`)
})