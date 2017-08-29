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

app.get ('/', function (req, res){
  res.redirect('players')
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

app.get ('/singleplayer', function (req, res){
  res.render('singleplayer')
})

app.post ('/players', (req, res) =>{
  playersdal.addPlayer(req.body.name, req.body.position, req.body.teams, req.body.nickname, req.body.titles, req.body.avatar, req.body.username, req.body.password);
  res.redirect('./players')
  console.log('------------------------------------')
  console.log(Players)
  console.log('------------------------------------')  
})

// ----------------------------------------- //

app.get('/editplayer/:id', (req, res) => {
  playersdal.editPlayer(req.params.id)
    res.render('editplayer')
  })

app.post('/editplayer/:id', (req, res) =>{
  playersdal.editPlayer(req.params.id)
  res.redirect('./players')
})

// ----------------------------------------- //

app.get('/singleplayer/:id', (req, res) => {
  playersdal.getPlayerById(req.params.id).then(function(playersLoad){
    res.render('./singleplayer', {playersLoad})
    console.log(playersLoad);
  })
})

app.get('/deleteplayer/:id', (req, res) => {
  playersdal.deletePlayer(req.params.id)
    res.render('./players')
  })

app.post('/deleteplayer/:id', (req, res) =>{
  playersdal.deletePlayer(req.params.id)
    res.redirect('/players')    
  })

