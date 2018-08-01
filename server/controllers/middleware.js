var jwt = require('jsonwebtoken');
require('dotenv').config()
module.exports = {
  authUser: function (req, res, next) {
    console.log('masuk middle')
    let token = req.headers.tokenapp
    console.log(token, '-----')
    // let x = jwt.verify(token, process.env.JWTsecret)
    // console.log('sssssss', x)
    jwt.verify(token, process.env.JWTsecret, function (err, decode) {
      console.log(decode)
      if (err) {
        res.json(err)
        console.log('errrr ', err)
      } else {
        next()
      }
    });
  }
}
