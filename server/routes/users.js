var express = require('express');
var router = express.Router();
let {
  Signup,
  login,
  FBSignup
} = require('../controllers/user.controller')



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



router
  .post('/signup', Signup)
  .post('/login', login)
  .get('/login/fb', FBSignup)

module.exports = router;
