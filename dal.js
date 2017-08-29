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
  return Players.findOne({Number: playerId})
}

function getPlayer (personId) {
  return player.find({ _id: playerId }).catch(function (err) {
    console.log(err)
  })
}

function getPlayerByNickname (nickname) {
  return player.find({ nickname: nickname }).catch(function (err) {
    console.log('ERROR!!!!!', err)
  })
}

function addPlayer (name, position, teams, nickname, titles, avatar, username, password){
  Players.create({name: name, position: position, teams: teams, nickname: nickname, titles: titles, avatar: avatar, username: username, password: password}, function (err, Players){
    if (err) return handleError(err)
  })
}

function deletePlayer (playerId) {
  Players.deleteOne({ Number: id })
  console.log(deletePlayer)
}

// function editPlayer (playerId)
//   Players.updateOne(
//     {Number: id},
//     {$set: {name: name, position: position, teams: teams, nickname: nickname, titles: titles, avatar: avatar, username: username, password: password}}, function (err, placeholder){
//       if (err){
//         console.log(err)
//       }
//     }
//   )


module.exports = {getAllPlayers: getAllPlayers, getPlayer: getPlayer, getPlayerByNickname: getPlayerByNickname, addPlayer: addPlayer, deletePlayer: deletePlayer, getPlayerById: getPlayerById }