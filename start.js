const mongoose = require("mongoose");
const express= require("express");
const app=express();
const port = process.env.PORT||3000
app.get('/',function(req,res){
  res.json(Employee);   
});

app.listen(port,function(){
  console.log("COnnected");
});

let employeeSchema=new mongoose.Schema({
  name: String,
  gmail:String,
  city:String,
  phoneno:String
});
let Employee = mongoose.model('Employee',employeeSchema);
let ram = new Employee({ name: 'Silence' ,gmail:'vishal@gmail.com',city:'trlvli',phoneno:'892390'});
ram.save(function (err, Employee) {
  if (err) return console.error(err);
  console.log(ram);
});
Employee.find(function (err, Employee) {
  if (err) return console.error(err);
  console.log(users);
  users.remove();
})
