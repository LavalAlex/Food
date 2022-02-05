const {Schema, model} = require('mongoose');

const dietSchema = new Schema({
    name:{
        type:String,
        unique: true
    }
})

module.exports = model('Diet', dietSchema);