var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Categories = Schema({
    name: {type: String, required:true, unique:true},
    state: {type: Boolean, required: true, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Categories', Categories);
