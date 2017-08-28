const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const players = require('./nbadata')
const app = express()
const playersdal = require('./dal')

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));

app.set('port', 3000)
  
app.listen(app.get('port'), function () {
    console.log('App is running on Andre 3000.')
  })

app.get ('/addplayer', function (req, res){
  res.render('addplayer')
})

app.get ('/players', function (req, res){
  const playerCards = playersdal.getAllPlayers().then(function(playersLoad){
    res.render('players', { playersLoad })
    console.log(playersLoad) 
  })
})

app.get ('/', function (req, res){
  res.redirect('players')
})

app.get ('/singleplayer', function (req, res){
  res.render('singleplayer')
})

app.post ('/players', function (req, res){
  res.redirect('./players')
})

app.post ('/addplayer', function (req, res){
  const addNewPlayer = playersdal.addPlayer().then(function(newPlayer){
    res.render('players', { playersLoad })
    console.log(addNewPlayer)
  })
})