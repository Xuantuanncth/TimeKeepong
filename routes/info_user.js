var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.userId){
    res.render('info/info_user', { title: "Info", isLogin: true });
  } else {
    res.render('info/info_user', { title: "Info", isLogin: false });
  }
});
module.exports = router;