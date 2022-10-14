// require packages and set variables
const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')
const app = express()
const port = 3000

// template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static files import
app.use(express.static('public'))

// route setting
// index page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

// show page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant => req.params.id === restaurant.id.toString())
  res.render('show', { restaurant })
})

// start and listen server
app.listen(port, () => {
  console.log(`This express server is running at http://localhost:${port}`)
})