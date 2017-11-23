let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

let adminSchema = new Schema({
    username: {type: String, required: true, unique: true},
    full_name: {type: String},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    password: {type: String, required: true},
    addDate: {type: Date, default: Date.now}
});


adminSchema.pre('save', function(next){
    var admin = this; 
  
    bcrypt.hash(admin.password, null, null, function(err, hash){
      if (err) return next(err);
      admin.password = hash; 
      next(); 
    });
});

adminSchema.methods.comparePass = function(password){
    //Make compare between to password and return true/ false
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Admin', adminSchema);