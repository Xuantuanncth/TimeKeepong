var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.userId){
    res.render('manage/manage_employee', { title: "Manage Employee", isLogin: true });
  } else {
    res.render('manage/manage_employee', { title: "Manage Employee", isLogin: false });
  }
});

module.exports = router;