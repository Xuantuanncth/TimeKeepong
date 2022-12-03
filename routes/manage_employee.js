var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let employee_info = getInfoEmployee();
  if (req.session.userId){
    res.render('manage/manage_employee', { title: "Manage Employee", isLogin: true, data:employee_info});
  } else {
    res.render('manage/manage_employee', { title: "Manage Employee", isLogin: false });
  }
});

function getInfoEmployee(){
  try {
    let _data = db.get('employee_info').value();
    if(_data){
      return _data;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}
module.exports = router;