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

function editPlayer (playerId){
  Players.update({'id': playerId}).catch(function(err){
    console.log(err)
  })
}


// function editPlayer (name, position, teams, nickname, titles, avatar, username, password){
//   Players.updateOne(
//     {$set: {"Name": name, "Position": position, "Teams": teams, "Nickname": nickname, "Titles": titles, "Avatar": avatar, "Username": username, "Password": password}}, function (err, Players){
//       if (err){
//         console.log(err)
//         console.log(updateOne)
//       }
//     }
//   )
// }

module.exports = {getAllPlayers: getAllPlayers, addPlayer: addPlayer, deletePlayer: deletePlayer, getPlayerById: getPlayerById, editPlayer: editPlayer}