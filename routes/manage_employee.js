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

/**
 * Delete employee
 * - Delete employee_key
 * - Delete employee_info
 * - Delete employee_Time
*/

router.get('/deleteEmployee', (req, res, next)=>{
  console.log("[deleteEmployee] Req.id: ", req.query.id);
  let isDeleteEmployeeKey = deleteFormID("employee_key",req.query.id);
  let isDeleteEmployeeInfo = deleteFormID("employee_info",req.query.id);
  let isDeleteEmployeeTime = deleteFormID("employee_Time",req.query.id);
  if(isDeleteEmployeeKey && isDeleteEmployeeInfo && isDeleteEmployeeTime){
    res.status(200).send({sts:"OK"});
  } else {
    res.status(500).send({sts:"Error"});
  }
})

function deleteFormID(dataBase,id){
  let old_data = [];
  try {
    db.get(dataBase).remove({id:id}).write();
    return 1;
  } catch (error) {
    console.log("[deleteFormID] Error: ", error);
    return 0;
  }
}

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