require("./models/db")
const mongoose = require("mongoose");
var path = require("path");
const express= require("express");
const bodyParser=require("body-parser");
const app=express();
const port = process.env.PORT||3000;
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//database schema creation
let employeeSchema=new mongoose.Schema({
  name: String,
  gmail:String,
  city:String,
  phoneno:String
});
let Employee = mongoose.model('Employee',employeeSchema);
//Get
app.get('/add',function(req,res){
  res.render('index.ejs')
});

// app.get('/show',function(req,res){
//   let points = [];
//   Employee.find(function (err, employee) {
//   if (err) return console.error(err);
//   points.push(employee);
//   res.send(points);
// })
// });

app.get('/',function(req,res){
    res.render('search.ejs');
});

app.get('/show',function(req,res){
  res.render('display.ejs');
})

app.get('/delete',function(req,res){
  res.render("delete.ejs");
})

app.post('/search',function(req,res){
  const data=req.body;
  Employee.find({name:data.name},function (err, employee) {
  if (err) return console.error(err);
  res.send(employee);
});
});

//POST
app.post("/addEmployee",function(req,res){
  const data=req.body
  let newEmp = new Employee({ name: data.name ,gmail:data.gmail,city:data.City,phoneno:data.phoneno});
  newEmp.save(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
  });
  res.redirect('/')
})
//Listening to port
app.listen(port,function(){
  console.log("COnnected");
});
