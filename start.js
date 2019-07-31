require("./models/db")
const mongoose = require("mongoose");
var path = require("path");
const express= require("express");
const bodyParser=require("body-parser");
const cookieParser = require('cookie-parser')
const redis = require('redis');
const session = require('express-session');
const app=express();
const port = process.env.PORT||3000;

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
    saveUninitialized: false,
    resave: false
}));
app.use(cookieParser())
app.use(bodyParser.json());

//database schema creation
let employeeSchema=new mongoose.Schema({
  name: String,
  email:String,
  city:String,
  phoneno:{ type: Number, minlength: 6, maxlength: 13 }
});
let userSchema=new mongoose.Schema({
  info:employeeSchema,
  password:{ type: String, min: 6 }
})
let Employee = mongoose.model('Employee',employeeSchema);
let User = mongoose.model('User',userSchema);
//Get



app.get('/',function(req,res){
  sess=req.session;
  sess.email; // equivalent to $_SESSION['email'] in PHP.
  sess.name;
  // Cookies that have not been signed
// console.log('Cookies: ', req.cookies)
// // Cookies that have been signed
// console.log('Signed Cookies: ', req.signedCookies)
sess = req.session;
console.log(sess.email)
    if(sess.email) {
      Employee.find({email:sess.email},function (err, employee) {
      if (err) return console.error(err);
      res.render('hellouser.ejs',{employee:employee});
    });
    }
    res.render('index.ejs');
});

app.get('/admin',(req,res) => {
    sess = req.session;
    if(sess.email) {
        res.write(`<h1>Hello ${sess.email} </h1><br>`);
        res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
});

app.get('/add',function(req,res){
  res.render('index.ejs')
});

app.get('/show',function(req,res){
  Employee.find({}, function(err, employee) {
         res.render('display.ejs', {employee: employee});
      });
})

app.get('/signup',function(req,res){
  res.render('signup.ejs')
})

app.get('/delete',function(req,res){
  res.render("delete.ejs");
})

app.post('/search',function(req,res){
  const data=req.body;
  Employee.find({name:data.name},function (err, employee) {
  if (err) return console.error(err);
  res.render('search.ejs',{employee:employee});
});
});

//POST

app.post("/addEmployee",function(req,res){
  const data=req.body
  let newEmp = new Employee({ name: data.name ,email:data.email,city:data.City,phoneno:data.phoneno});
  newEmp.save(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
  });
  res.redirect('/')
})

app.post("/adduser",function(req,res){
  sess = req.session;
  sess.email = req.body.email;
  const data=req.body
  let newEmp = new Employee({ name: data.name ,email:data.email,city:data.City,phoneno:data.phoneno});
  let newUser=new User({info:newEmp,password:data.password})
  newEmp.save(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
  });
  newUser.save(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
  });
  res.redirect('/')
})

app.post("/delEmployee",function(req,res){
  Employee.deleteMany({ name:req.body.name },(err, data) => {
    if(err){
      console.log(err);
    }
    console.log(null, data);
    });
//done(null/, data/);
  res.redirect("/");
})

app.post('/login',(req,res) => {
    sess = req.session;
    sess.email = req.body.email;
    res.end('done');
});

//Listening to port
app.listen(port,function(){
  console.log("COnnected");
});
