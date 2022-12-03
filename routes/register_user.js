var express = require('express');
const db = require('../db');
var router = express.Router();
/**
 * Update :
 *        - Handle id number < 10
 *        - Check id < 10 => id = 0+id
*/
/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.userId){
    res.render('register/register_user', { title: "Register", isLogin: true });
  } else {
    res.render('register/register_user', { title: "Register", isLogin: false });
  }
});

/**
 * Save info form server
*/
router.post('/createUser',(req, res) =>{
  console.log("Register User: ", req.body);

  let isNewId = createKeyEmployee(req.body.id, req.body.name);
  if(isNewId){
    try {
      db.get("employee_info").push(req.body).write();
      res.status(200).redirect('/manage');
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.send(" Id is exist, please correct ID");
  }
})

/*
 * Create key employee: id, name
*/
function createKeyEmployee(id,name){
  let isId = db.get('employee_key').find({id:id}).value();
  if(isId){
    console.log("[createKeyEmployee] ID is exist");
    return false;
  } else {
    console.log("[createKeyEmployee] Update key member");
    db.get('employee_key').push({id:id,name:name}).write();
    return true;
  }
}

module.exports = router;