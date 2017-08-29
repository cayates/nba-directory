const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: { type: String, require: true },
  position: { type: String, require: true },
  teams: { type: String, require: true },
  nickname: { type: String },
  titles: { type: Number },
  avatar: { type: String },
  username: { type: String },
  password: { type: String, select: false }
})

playerSchema.statics.findByName = function (name, cb) {
    return this.find({ name: name })
  }
  
const Players = mongoose.model('nbaplayers', playerSchema)

module.exports = Players

