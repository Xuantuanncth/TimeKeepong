var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.userId){
    res.render('register/register_user', { title: "Register", isLogin: true });
  } else {
    res.render('register/register_user', { title: "Register", isLogin: false });
  }
});

router.post('/createUser',(req, res) =>{
  console.log("Register User: ", req.body);
  res.send("OK");
})

module.exports = router;