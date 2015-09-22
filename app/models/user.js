var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  name: String,
  username: { type: String, required: true, index: { unique: true }},
  password: {type: String, required: true, select: false }//user를 쿼리할 때 비밀번호는 제공되지 않도록 설정. select: false.
});

//password가 저장되기 전에 해시 해라.
UserSchema.pre('save', function(next){
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

//password와 해시 값을 비교하는 메서드.
UserSchema.methods.comparePassword = function(password){
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
