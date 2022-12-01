var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.userId){
    res.render('view/view_data', { title: "View", isLogin: true });
  } else {
    res.render('view/view_data', { title: "View", isLogin: false });
  }
});

module.exports = router;