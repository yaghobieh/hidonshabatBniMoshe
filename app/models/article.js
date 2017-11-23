let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let article = new Schema({
    title: {type: String, required: true},
    fileUrl: {type: String, required: true},
    description: {type: String, required: true},
    data_upload: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Article', article);