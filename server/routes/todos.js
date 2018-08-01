var express = require('express');
var router = express.Router();
let {
  authUser
} = require('../controllers/middleware');



let {
  addTodo,
  deleteTodo,
  allTodo,
  viewTodo,
  updatetodo,
  searchYoutube
} = require('../controllers/todos.controller')


/* GET users listing. */
router.get('/todo', authUser, viewTodo);


router
  .post('/todo/add', authUser, addTodo)
  .delete('/todo/delete/:id', authUser, deleteTodo)
  .put('/todo/update/:id', updatetodo)
  .get('/youtube/search', searchYoutube)


module.exports = router;
