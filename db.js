var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});
var UserSchema = new mongoose.Schema({
  name: String,
  gmail:String,
  password:String
});
UserSchema.methods.speak = function () {
  var greeting = this.name
    ? "My name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}
var User = mongoose.model('User', UserSchema);
var ram = new User({ name: 'Silence' ,gmail:'vishal@gmail.com',password:'sdlas'});
console.log(ram); // 'Silence'
ram.save(function (err, fluffy) {
  if (err) return console.error(err);
  ram.speak();
});
User.find(function (err, users) {
  if (err) return console.error(err);
  console.log(users);
  users.remove();
})
