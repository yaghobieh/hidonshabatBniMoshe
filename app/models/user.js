let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let user = new Schema({
    full_name: {type: String, required: true, unique: true},
    address: {type: String},
    phone: {type: String},
    email: {type: String, required: true},
    checked: {type: Boolean, default: false},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', user);