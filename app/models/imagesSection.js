let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let imageSchema = new Schema({
    title: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true},
    data_upload: {type: Date, default: Date.now}
});

module.exports = mongoose.model('imageSchema', imageSchema);