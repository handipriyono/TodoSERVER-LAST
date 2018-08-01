let User = require('../models/users')
var jwt = require('jsonwebtoken');
var FB = require('fb');
// var bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs');
const axios = require('axios');
require('dotenv').config()
module.exports = {


  FBSignup: function (req, res) {
    FB.api('/me', {
      fields: ['id', 'first_name', 'email'],
      access_token: req.headers.fbtoken
    }, function (dataFB) {

      console.log(dataFB)
      User.findOne({
          email: dataFB.email
        })
        .then(function (result) {

          if (result) {
            //sudah punya akun disini
            var token = jwt.sign({
              data: result.email,
              id: result._id
            }, process.env.JWTsecret);
            res.json({
              tokenfbnya: token
            })
          } else {
            var hash = bcrypt.hashSync(dataFB.first_name + '12' + dataFB.email, 8);
            //belum punya akun
            User.create({
                username: dataFB.first_name,
                email: dataFB.email,
                password: hash
              })
              .then(function (dataHasil) {
                console.log('HASH:  ', hash)

                console.log(dataHasil)
                var token = jwt.sign({
                  data: dataHasil.email,
                  id: dataHasil._id
                }, process.env.JWTsecret);
                res.json({
                  tokenfbnya: token
                })
              })
          }
        })
    });
  },

  Signup: function (req, res) {
    let {
      username,
      email,
      password
    } = req.body

    let hash = bcrypt.hashSync(req.body.password, 8);
    User.create({
        username,
        email,
        password: hash
      })
      .then(function (result) {

        var token = jwt.sign({
          data: result.email,
          id: result._id
        }, process.env.JWTsecret);
        res.json({
          result,
          token: token
        })

        // res
        //   .status(201)
        //   .json(result)
      })
      .catch(function (err) {
        console.log(err)
        res.json(err)
      })
  },



  login: function (req, res) {
    User.findOne({
        email: req.body.email
      })
      .then(function (resultUser) {
        if (resultUser) {

          let cek = bcrypt.compareSync(req.body.password, resultUser.password); // true
          if (cek) {


            var token = jwt.sign({
              data: resultUser.email,
              id: resultUser._id
            }, process.env.JWTsecret);
            res.json({
              resultUser,
              token: token
            })

          } else {
            console.log('err')
            res.json('password/ username salah')
          }

        } else {


          res.json('pass/username salah')
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }


}
