var express = require('express');
const db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.userId){
    res.render('homepage/home', { title: "Dash Board", isLogin: true });
  } else {
    res.render('homepage/home', { title: "Dash Board", isLogin: false });
  }
});

/*
  * Update store data
  */

let time = [];
router.get('/storeTime',(req,res) => {
  console.log("[Debug] ================> ", req.query.time);
  if(req.query.id < 10){
    req.query.id = "0"+req.query.id;
  }
  time = {
    time:req.query.time
  }
  let isUpdateData = updateData(req.query.id, req.query.date,time);
  if(isUpdateData){
    res.send("Ok");
  } else {
    res.send("Error");
  }

});

function createData(id, date,time){
  // console.log("Create data: ===============> 1");
  try {
    db.get('employee_Time').push({
      id:id,
      date:date,
      data:[time]
    }).write();
    return 1;
  } catch (error) {
    console.log("Create data employee_time fail! Can't access into DataBase: ",error);
    return 0;
  }
}

function updateData(in_id,in_date, in_time){
  // console.log("Update Data: ====================> 1");
  try {
    let value = db.get('employee_Time').find({id:in_id,date:in_date}).value();
    // console.log("value: ",value);
    if(value){
      value.data.push(in_time);
      console.log("Data update: ",value);
      db.get('employee_Time').find({id:in_id,date:in_date}).assign({data:value.data}).write();
      return 1;
    } else {
      let isCreateData = createData(in_id, in_date, in_time);
      return isCreateData;
    }
  } catch (error) {
    console.log("Data update error: ",error);
    return 0;
  }
}

module.exports = router;
