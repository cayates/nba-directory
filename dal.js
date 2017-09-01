const mongoose = require('mongoose')
const Players = require('./model')
mongoose.Promise = require('bluebird')
const url = 'mongodb://localhost:27017/nbaplayersdb'

mongoose.connect('mongodb://localhost:27017/nbaplayersdb', {
  useMongoClient: true
})

function getAllPlayers () {
  return Players.find()
}

function getPlayerById(playerId){
  return Players.findOne({'_id': playerId}).catch(function(err){
    console.log(err)
  })
}

function addPlayer (name, position, teams, nickname, titles, avatar, username, password){
  Players.create({name: name, position: position, teams: teams, nickname: nickname, titles: titles, avatar: avatar, username: username, password: password}, function (err, Players){
    if (err) return handleError(err)
  })
}

function deletePlayer (playerId) {
  Players.deleteOne({'_id': playerId}).catch(function(err){
    console.log(err)    
  })
}

function editPlayer(playerId, updatedPlayer){
  Players.findOneAndUpdate({'_id': playerId,}, updatedPlayer, {upsert: true}, function(err, doc) {
    console.log(doc, 'from editPlayer dal method')

  })
}


// function editPlayer (name, position, teams, nickname, titles, avatar, username, password){
//   Players.updateOne(
//     {$set: {name: name, position: position, teams: teams, nickname: nickname, titles: titles, avatar: avatar, username: username, password: password}}, function (err, Players){
//     }
//   )
// }

// db.products.update(
//   { _id: 100 },
//   { $set:
//      {
//        quantity: 500,
//        details: { model: "14Q3", make: "xyz" },
//        tags: [ "coats", "outerwear", "clothing" ]
//      }
//   }
// )

module.exports = {getAllPlayers: getAllPlayers, addPlayer: addPlayer, deletePlayer: deletePlayer, getPlayerById: getPlayerById, editPlayer: editPlayer}