var express = require('express');
var router = express.Router();
let db = require('../db');

/**
 * Done base view page
 * Update:
 *        * Clear box search after search
*/

let key_Employee = [];
function getKeyEmployee(){
  try {
    key_Employee = db.get('employee_key').value();
    return 1;
  } catch (error) {
    return 0;
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  getKeyEmployee();
  if (req.session.userId){
    res.render('view/view_data', { title: "View", isLogin: true });
  } else {
    res.render('view/view_data', { title: "View", isLogin: false });
  }
});

/**
 * Convert raw Data   {                              to true Data  {
 *                       "id": "04",                                   "id": "04",
 *                       "date": "26/07/2022",                         "name" : 'Tran Van Dung',
 *                       "day": "Tuesday",                             "date": "26/07/2022",
 *                       "data": [                                     "time_in": '13:00',
 *                         {                                           "time_out": '15:00'
 *                           "time": "13:00"                         }
 *                         },
 *                         {
 *                           "time": "15:00"
 *                         }
 *                       ] 
 *                     }
*/
function prepareData(rawData){
  let trueData = {};
  trueData.id = rawData.id;
  key_Employee.forEach(element => {
    if(element.id == rawData.id){
      trueData.name = element.name;
    }
  });
  trueData.date = rawData.date;
  let _length_t = rawData.data.length;
  console.log("[prepareData] length: ",_length_t);
  if(_length_t > 1){
    trueData.time_in = rawData.data[0].time;
    trueData.time_out = rawData.data[_length_t-1].time;
  } else if(_length_t == 1){
    trueData.time_in = rawData.data[0].time;
    trueData.time_out = 0;
  } else {
    trueData.time_in =  0;
    trueData.time_out = 0;
  }
  return trueData;
}

/**
 * getData form Database
 * Search for Id and Date
 * Search for Id
 * Search for Date
 * Need refactor code*
*/
router.get('/getData',(req,res) => {
  console.log("[getData] Req.id ", req.query.id, "Req.date: ", req.query.date);
  _id = req.query.id;
  _date_in = req.query.date;
  let data_time=[];
  if(_id){
    if(_date_in){
      try {
        let _data = db.get('employee_Time').find({id:_id,date:_date_in}).value();
        if(_data){
          let dataFull = prepareData(_data);
          return res.status(200).send(dataFull);
        } 
      } catch (error) {
        console.log('[getData] Error: ',error);
        return res.status(200).send(error);
      }
    } else {
      let _data = db.get('employee_Time').value();
      _data.forEach(element => { 
        if(element.id == _id){
          data_time.push(prepareData(element));
        }
      });
      console.log("Data_time: ",data_time);
      return res.status(200).send(data_time);
    }
  } else {
    if(_date_in){
      let _data = db.get('employee_Time').value();
      _data.forEach(element => { 
        if(element.date == _date_in){
          data_time.push(prepareData(element));
        }
      });
      return res.status(200).send(data_time);
    } else {
      res.send("Id and date is empty");
    }
  }
})

module.exports = router;