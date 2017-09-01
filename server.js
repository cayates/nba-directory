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

app.set('port', 3000)

app.use(express.static('public'));
  
app.listen(app.get('port'), function () {
    console.log('App is running on Andre 3000.')
  })

// ----------------------------------------- //

app.get ('/addplayer', function (req, res){
  res.render('addplayer')
})

// ----------------------------------------- //

app.get ('/', function (req, res){
  res.redirect('players')
})

// ----------------------------------------- //
// ----------------------------------------- //

app.get ('/singleplayer', function (req, res){
  res.render('singleplayer')
})

app.get('/singleplayer/:id', (req, res) => {
  playersdal.getPlayerById(req.params.id).then(function(playersLoad){
    res.render('./singleplayer', {playersLoad})
    console.log(playersLoad);
  })
})

// ----------------------------------------- //
// ----------------------------------------- //

app.get ('/players', function (req, res){
  const playerCards = playersdal.getAllPlayers().then(function(playersLoad){
    res.render('players', { playersLoad })
    console.log(playersLoad) 
  })
})

app.post ('/players', (req, res) =>{
  playersdal.addPlayer(req.body.name, req.body.position, req.body.teams, req.body.nickname, req.body.titles, req.body.avatar, req.body.username, req.body.password);
  res.redirect('./players')
  console.log(Players)
})

// ----------------------------------------- //
// ----------------------------------------- //

app.get('/editplayer/:id', (req, res) => {
  const editPlayerCard = playersdal.getPlayerById(req.params.id).then(function(playersLoad){
    res.render('./editplayer', { playersLoad })    
  })
  })

  app.post('/editplayer/:id', (req, res) =>{
    
    playersdal.editPlayer(req.params.id, req.body)
    res.redirect('/players')
  })

// app.post('/editplayer/:id', (req, res) =>{
//   const updatedPlayer = (req.body.name, req.body.position, req.body.teams, req.body.nickname, req.body.titles, req.body.avatar, req.body.username, req.body.password);  
//   playersdal.editPlayer(req.params.id, updatedPlayer)
//     res.redirect('/players')
// })

// app.post('/edit',(req, res) => {
//   db.collection('blogs').update ({ _id: ObjectId(req.body._id) }, {$set: {
//      title: req.body.title,
//      description: req.body.description
//   }
//   }, function (err, result) {
//        if (err) {
//        console.log(err);
//      } else {
//       console.log("Post Updated successfully");
//       res.render('blog.ejs');
//   }
//  });

// ----------------------------------------- //

// ----------------------------------------- //

app.get('/deleteplayer/:id', (req, res) => {
  playersdal.deletePlayer(req.params.id)
    res.render('./players')
  })

app.post('/deleteplayer/:id', (req, res) =>{
  playersdal.deletePlayer(req.params.id)
    res.redirect('/players')    
  })

// ----------------------------------------- //

