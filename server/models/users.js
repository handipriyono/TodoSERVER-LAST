const mongoose = require('mongoose')
const Schema = mongoose.Schema
let uniqueValidator = require('mongoose-unique-validator')


const peopleSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true // removes whitespace accidentally
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // removes whitespace accidentally
    uniqueCaseInsensitive: true
  },
  password: {
    type: String,
    required: true
  }

}, {
  timestamps: true
})


peopleSchema.plugin(uniqueValidator)
const User = mongoose.model('User', peopleSchema);

module.exports = User
