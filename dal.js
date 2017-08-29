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

function addPlayer (newPlayer) {
  const player = new Players({newPlayer})
  newPlayer.save(function (err) {
    console.log(err)
    return player
    console.log(addPlayer)
  })
  return Promise.resolve('success')
}

function deletePlayer (playerId) {
  return player.deleteOne({ _id: personId })
}

module.exports = {getAllPlayers: getAllPlayers, getPlayer: getPlayer, getPlayerByNickname: getPlayerByNickname, addPlayer: addPlayer }