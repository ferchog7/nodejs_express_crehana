var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Books = Schema({
    name: {type: String, required:true, unique:true},
    state: {type: Boolean, required: true, default: false},
    categoryId: {type: Schema.ObjectId, ref:"Category"},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Books', Books);
