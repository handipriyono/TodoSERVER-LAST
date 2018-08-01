let Todo = require('../models/todos')
var jwt = require('jsonwebtoken');
let User = require('../models/users')
const axios = require('axios')
require('dotenv').config()

module.exports = {
  searchYoutube: function (req, res) {

    let find = req.headers.find
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${find}&maxResults=4&key=${process.env.ytkey}`)
      .then(function (data) {
        let result = data.data.items
        let arr = []
        result.forEach(function (yt) {
          arr.push(yt)
        })
        let vidId = []
        arr.forEach(function (list) {
          vidId.push(list.id.videoId)
        })
        let saveyt = []
        for (let i = 0; i < vidId.length; i++) {
          saveyt.push(vidId[i])
        }
        res.json(vidId)
      })
      .catch(function (err) {
        res.json(err)
      })
  },


  viewTodo: function (req, res) {
    var decodeds = jwt.verify(req.headers.tokenapp, process.env.JWTsecret);
    console.log('ini idi decodes', decodeds.id)
    Todo.find({
        author: decodeds.id
      }).sort({
        createdAt: 'desc'
      })
      .populate('author')
      .exec(function (err, data) {
        if (err) {
          console.log(err)
          res.json(err)
        } else {
          console.log('ini data', data)
          res.json(data)
        }
      })
  },


  addTodo: function (req, res) {
    var decodeds = jwt.verify(req.headers.tokenapp, process.env.JWTsecret);
    Todo.create({
        content: req.body.content,
        author: decodeds.id,
        isDone: false
      })
      .then(function (result) {
        res
          .status(201)
          .json(result)
      })
      .catch(function (err) {
        console.log(err)
        res.json(err)
      })
  },


  deleteTodo: function (req, res) {
    Todo.findByIdAndRemove({
        _id: req.params.id
      })
      .then(function (result) {
        res.json({
          message: "Todo telah dihapus",
          result
        })
      })
      .catch(function (err) {
        console.log(err)
        res.json(err)
      })
  },



  allTodo: function (req, res) {
    var decodeds = jwt.verify(req.headers.tokenapp, process.env.JWTsecret);
    console.log(decodeds)
    Todo.find({
        author: decodeds.id
      })
      .then(function (dataTodo) {
        console.log(dataTodo)
        res.json(dataTodo)
      })
      .catch(function (err) {
        console.log(err)
        res.json(err)
      })
  },

  updatetodo: function (req, res) {
    Todo.findByIdAndUpdate(req.params.id, {
        content: req.body.content
      })
      .then(function (dataUpdate) {
        console.log(dataUpdate)
        res.json(dataUpdate)
      })
      .catch(function (err) {
        console.log(err)
        res.json(err)
      })

  }

}
