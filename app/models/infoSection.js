let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let infoSchema = new Schema({
    title: {type: String, required: true},
    body_content: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    editDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('InfoSection', infoSchema);